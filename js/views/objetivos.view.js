import api from '../api.js';
import router from '../routes.js';

var Objetivos = {
    data: function(){
        return {
            objetivos: {},
            objetivo: {
                descricao: "",
                ativo: true
            },
            modal_objetivo: {
                id_objetivo: "",
                titulo: "",
                novo: true
            }
        };
    },
    methods: {
        atualizaListaObjetivos(){
            api.getObjetivos().then( (objetivos) => {
                this.objetivos = objetivos;
            } );
        },
        novo_objetivo(){
            this.objetivo = {
                descricao: "",
                ativo: true
            }

            this.modal_objetivo.titulo = "Novo objetivo";
            this.modal_objetivo.novo = true;
            
            $("#modal_objetivo").modal("show");
        },
        altera_objetivo(p, k){
            this.modal_objetivo.id_objetivo = k;
            this.objetivo = Object.assign({}, p);;

            this.modal_objetivo.titulo = p.descricao;
            this.modal_objetivo.novo = false;
            
            $("#modal_objetivo").modal("show");
        },
        altera_status(data, id){
            data.ativo = !data.ativo;
            api.setObjetivo(id, data);

            this.atualizaListaObjetivos();
        },
        salvar(){

            if( this.modal_objetivo.novo ){
                api.createObjetivo(this.objetivo);
            }else{
                api.setObjetivo(this.modal_objetivo.id_objetivo, this.objetivo);
            }

            this.atualizaListaObjetivos();

            $("#modal_objetivo").modal("hide");
        }
    },
    beforeMount(){
        api.getUsuario( this.$root.$data.usuario.uid ).then( (usuario) => {
            if(!usuario.admin){
                router.push("/dashboard");
                return;
            }
        } );

        this.atualizaListaObjetivos();
    },
    template: `<div class="col-12">
        <h3>Objetivos</h3>
        <small>
            <i class="fa fa-info"></i>
            Objetivo é a meta estipulada pela gerência - pode ser um indicador do setor, por exemplo - que o usuário deve alcançar para conseguir pontos.
        </small>
        <hr>
        <div class="white-bg p-3">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Descricao</th>
                        <th width="70">Alteração</th>
                        <th width="70">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(o, k) in objetivos">
                        <th>{{o.descricao}}</th>
                        <th><a href="#" v-if="o.ativo" class="btn btn-primary btn-sm" @click="altera_objetivo(o, k)"><i class="fa fa-pencil-alt"></i></a></th>
                        <th>
                            <a href="#" v-if="!o.ativo" class="btn btn-danger btn-sm" @click="altera_status(o, k)" ><i class="fa fa-eye-slash"></i></a>
                            <a href="#" v-if="o.ativo" class="btn btn-success btn-sm" @click="altera_status(o, k)" ><i class="fa fa-eye"></i></a>
                        </th>
                    </tr>
                </tbody>
            </table>
            <br>
            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" @click="novo_objetivo()"> Novo Objetivo </button>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modal_objetivo">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">{{modal_objetivo.titulo}}</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-12">
                        <h5>Descrição:</h5>
                        <input type="text" class="form-control" v-model="objetivo.descricao" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="salvar()">Salvar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>`
};

export default Objetivos;