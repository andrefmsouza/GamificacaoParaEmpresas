import api from '../api.js';

var AdmPontos = {
    data: function(){
        return {
            pontuacoes: [],
            objetivos: [],
            usuarios: [],
            usuario: {},
            objetivo: {},
            pontos: 0,
            calculadora: {
                tempo_max: 60,
                tempo_realizado: 60,
                pontos_min: 4,
                resultado: 240
            }
        };
    },
    methods: {
        adicionar_pontos(){
            if( this.usuario != {} && this.objetivo != {} && parseInt(this.pontos) > 0 ){
                api.createPontuacao({
                        usr_adm: this.$root.$data.usuario.uid,
                        player: this.usuario.k,
                        pontos: parseInt(this.pontos),
                        motivo: this.objetivo.o.descricao,
                        data: new Date().getTime()
                    },
                    this.usuario.k
                ).then( () => {
                    
                    this.pontos = 0;
                    
                    this.atualiza_dados();
                });

            }else{
                alert("Preencha todos os campos!");
            }
        },
        atualiza_dados(){
            api.getListaUsuarios().then( ( listaUsuarios ) => {
                this.usuarios = listaUsuarios;

                this.usuario = {};
            } );

            api.getObjetivosAtivos().then( ( listaObjetivos ) => {
                this.objetivos = listaObjetivos;
                this.objetivo = {};
            } );

            api.getPontuacoes().then( ( listaPontuacoes ) => {
                this.pontuacoes = listaPontuacoes;
            } );
        },
        calcular(){
            let tempo_realizado = parseInt(this.calculadora.tempo_realizado);
            let tempo_max = parseInt(this.calculadora.tempo_max);
            let pontos_min = parseInt(this.calculadora.pontos_min);

            if( tempo_realizado <= tempo_max ){
                this.calculadora.resultado = parseInt( (2 - ( tempo_realizado / tempo_max ) ) * pontos_min * tempo_max );
            }else{
                this.calculadora.resultado = 0;
            }
        },
        carregar_pontos(){
            this.pontos = this.calculadora.resultado;
        }
    },
    beforeMount(){
        this.atualiza_dados();
    },
    template: `<div class="col-12">
        <h3>Administração de Pontos</h3>
        <hr>
        <div class="white-bg p-3">
            <div class="row">
                <div class="col-12 col-sm-6 mx-auto">
                    <h4 class=" text-center">Calculadora de Pontos</h4>
                    <small>
                        <i class="fa fa-info"></i> <br />
                        Quando um funcionário realiza uma tarefa em tempo recorde, o valor da premiação se torna maior. <br/>
                        Esta calculadora ajuda o gestor à calcular o valor da atividade mais a bonificação.
                    </small>
                    <hr>
                    <div class="col-12">
                        <h5>Tempo máximo para execução da tarefa(min):</h5>
                        <input type="number" class="form-control" v-model="calculadora.tempo_max" @change="calcular()" />
                    </div>
                    <div class="col-12">
                        <h5>Tempo realizado(min):</h5>
                        <input type="number" class="form-control" v-model="calculadora.tempo_realizado"  @change="calcular()" />
                    </div>
                    <div class="col-12">
                        <h5>Pontos/Min:</h5>
                        <input type="number" class="form-control" v-model="calculadora.pontos_min"  @change="calcular()" />
                    </div>
                    <div class="col-12">
                        <h5>Resultado:</h5>
                        $ {{calculadora.resultado}}
                    </div>

                    <div class="col-12">
                        <br>
                        <button type="button" class="btn btn-block btn-success" @click="carregar_pontos()">Carregar Pontos</button>
                    </div>
                </div>

                <div class="col-12 col-sm-6 mx-auto">
                    <h4 class=" text-center">Pontuar Jogador</h4>
                    <hr>
                    <div class="col-12">
                        <label>Usuário:</label>
                        <select class="form-control" v-model="usuario">
                            <option v-for="(u, k) in usuarios" v-bind:value="{k:k, u:u}">{{u.nome}}</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <label>Objetivo:</label>
                        <select class="form-control" v-model="objetivo">
                            <option v-for="(o, k) in objetivos" v-bind:value="{k:k, o:o}">{{o.descricao}}</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <label>$:</label>
                        <input type="number" class="form-control" v-model="pontos" />
                    </div>

                    <div class="col-12">
                        <br>
                        <button class="btn btn-block btn-primary" @click="adicionar_pontos()"> Adicionar </button>
                    </div>
                </div>
            </div>

            <br><br>
            
            <div class="row">
                <div class="col-12 ">
                    <hr>
                    <h4 class="text-center">Histórico de Distribuição de Pontos</h4>
                    <br>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Jogador</th>
                                <th>Motivo</th>
                                <th>Data</th>
                                <th width="100">$</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in pontuacoes">
                                <th>{{usuarios[p.player].nome}}</th>
                                <th>{{p.motivo}}</th>
                                <th width="100">{{p.data_str}}</th>
                                <th width="100">{{p.pontos}}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`
};

export default AdmPontos;