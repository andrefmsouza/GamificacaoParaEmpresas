import api from '../api.js';

var Profile = {
    data: function(){
        return {
            usuario: {
                nome: ""
            }
        };
    },
    methods: {
        userChange(user){
            if( user )
                this.usuario = user;
            else
                this.usuario = {
                    nome: ""
                };
        },
        salvar_dados(){
            api.setUsuario( this.$root.$data.usuario.uid, this.usuario ).then( () => {
                alert("Dados salvos!");
            } );
        }
    },
    beforeMount(){
        api.getUsuario( this.$root.$data.usuario.uid ).then( (u) => {
            this.userChange(u);
        } )
    },
    template: `<div class="col-12">
        <h3>Perfil</h3>
        <hr>
        <div class="white-bg p-3">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3">
                    Nome:
                    <input type="text" v-model="usuario.nome" class="form-control" />
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-4 col-md-6 col-lg-2 m-auto">
                    <br>
                    <button class="btn btn-primary btn-block" @click="salvar_dados()">Salvar</button>
                </div>
            </div>
        </div>
    </div>`
};

export default Profile;