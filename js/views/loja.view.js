import api from '../api.js';

var Loja = {
    data: function(){
        return {
            produtos_snapshot: {},
            produtos: {},
            produto: {},
            saldo_usuario: 0
        };
    },
    methods: {
        atualizaDados(){
            api.getProdutosAtivos().then( (produtos) => {
                if( produtos )
                    this.produtos = produtos;
                else
                    this.produtos = {};
            } );
    
            api.getUsuario(this.$root.$data.usuario.uid).then( (usuario) => {
                this.saldo_usuario = parseInt(usuario.saldo);
            } );            
        },
        resgatar(produto, chave){
            if( this.saldo_usuario >= produto.preco ){
                if( confirm("Tem certeza que deseja resgatar o produto '" + produto.descricao +"' ($ "+ produto.preco +")") ){

                    api.createResgate({
                        player: this.$root.$data.usuario.uid,
                        pontos: produto.preco,
                        produto_chave: chave,
                        produto_descricao: produto.descricao,
                        data: new Date().getTime()
                    }, this.$root.$data.usuario.uid, produto, chave).then( () => {
                        this.atualizaDados();
                    } );
                }
            }else{
                alert("Você não possui $ o suficiente para resgatar este item!");
            }
        }
    },
    beforeMount(){
        this.atualizaDados();
    },
    template: `<div class="col-12">
        <h3>Loja</h3>
        <hr>
        <div class="row">
            <div class="col-12 col-lg-4 col-md-6 produto" v-for="(p, k) in produtos">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{p.descricao}}</h5>
                        <div class="row foto_produto ">
                            <img class="img-fluid m-auto" :src="p.foto" alt="Foto do produto">
                        </div>
                        <p>
                            <strong>
                                $ {{p.preco}}
                                <br>
                                Qtd disponível: {{p.qtd}}
                            </strong>
                        </p>
                        <a href="#" class="btn btn-primary btn-block" v-bind:class="{ 'disabled': p.qtd === 0 }" @click="resgatar(p, k)">Resgatar</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="saldo_usuario btn btn-success" >
            $ {{saldo_usuario}}
        </div>
    </div>`
};

export default Loja;