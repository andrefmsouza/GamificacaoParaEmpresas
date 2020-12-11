import api from '../api.js';

var Produtos = {
    data: function(){
        return {
            produtos: {},
            produto: {
                foto: "",
                descricao: "",
                qtd: 0,
                preco: 0,
                ativo: true
            },
            modal_produto: {
                id_produto: "",
                titulo: "",
                novo: true
            }
        };
    },
    methods: {
        uploadImage(){
            var file = $('#foto')[0].files[0];
            
            new Promise( (resolve, reject) => {
                var reader = new FileReader();
                reader.onload = function(e) {
                    resolve( e.target.result );
                };
                reader.onerror = function(error) {
                    alert(error);
                };
                reader.readAsDataURL(file);  
            })
            .then(
                (foto) =>{
                    this.produto.foto = foto;
                }
            );
        },
        atualizaListaProdutos(){
            api.getProdutos().then( (produtos) => {
                if( produtos )
                    this.produtos = produtos;
                else
                    this.produtos = {};
            } );
        },
        novo_produto(){
            this.produto = {
                foto: "",
                descricao: "",
                qtd: 0,
                preco: 0,
                ativo: true
            }

            this.modal_produto.titulo = "Novo produto";
            this.modal_produto.novo = true;
            
            $("#modal_produto").modal("show");
        },
        altera_produto(p, k){
            this.modal_produto.id_produto = k;
            this.produto = Object.assign({}, p);;

            this.modal_produto.titulo = p.descricao;
            this.modal_produto.novo = false;
            
            $("#modal_produto").modal("show");
        },
        altera_status(data, id){
            data.ativo = !data.ativo;
            api.setProduto(id, data);

            this.atualizaListaProdutos();
        },
        salvar(){

            if( this.modal_produto.novo ){
                api.createProduto(this.produto);
            }else{
                api.setProduto(this.modal_produto.id_produto, this.produto);
            }

            this.atualizaListaProdutos();

            $("#modal_produto").modal("hide");
        }
    },
    beforeMount(){
        api.getUsuario( this.$root.$data.usuario.uid ).then( (usuario) => {
            if(!usuario.admin){
                router.push("/dashboard");
                return;
            }
        } );

        this.atualizaListaProdutos();
    },
    template: `<div class="col-12">
        <h3>Produtos</h3>
        <hr>
        <div class="white-bg p-3">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Descricao</th>
                        <th>Qtd Disp.</th>
                        <th>$</th>
                        <th width="70">Alteração</th>
                        <th width="70">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, k) in produtos">
                        <th>{{p.descricao}}</th>
                        <th>{{p.qtd}}</th>
                        <th>{{p.preco}}</th>
                        <th><a href="#" v-if="p.ativo" class="btn btn-primary btn-sm" @click="altera_produto(p, k)"><i class="fa fa-pencil-alt"></i></a></th>
                        <th>
                            <a href="#" v-if="!p.ativo" class="btn btn-danger btn-sm" @click="altera_status(p, k)" ><i class="fa fa-eye-slash"></i></a>
                            <a href="#" v-if="p.ativo" class="btn btn-success btn-sm" @click="altera_status(p, k)" ><i class="fa fa-eye"></i></a>
                        </th>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" @click="novo_produto()"> Novo Produto </button>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modal_produto">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">{{modal_produto.titulo}}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-12">
                        <h5>Foto:</h5>
                        <input @change="uploadImage" type="file" id="foto" accept="image/*">
                        <br>
                        <img :src="produto.foto" class="img-fluid">  
                    </div>
                    <div class="col-12">
                        <h5>Descrição:</h5>
                        <input type="text" class="form-control" v-model="produto.descricao" />
                    </div>
                    <div class="col-12">
                        <h5>Quantidade:</h5>
                        <input type="number" class="form-control" v-model="produto.qtd" />
                    </div>
                    <div class="col-12">
                        <h5>$:</h5>
                        <input type="number" class="form-control" v-model="produto.preco" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="salvar()">Salvar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
                </div>
            </div>
        </div>
    </div>`
};

export default Produtos;