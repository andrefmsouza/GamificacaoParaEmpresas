import api from '../api.js';

var Historico = {
    data: function(){
        return {
            historico: []
        };
    },
    methods: {

    },
    beforeMount(){
        
        api.getHistoricoUsuario(this.$root.$data.usuario.uid).then( (historico) => {
            this.historico = historico;
        } );

        
    },
    template: `<div class="col-12">
        <h3>Histórico</h3>
        <hr>
        <div class="white-bg p-3">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Descricao</th>
                        <th>Data</th>
                        <th width="100">RIV$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="h in historico">
                        <th>{{h.descricao}}</th>
                        <th width="100">{{h.data_str}}</th>
                        <th width="100">{{h.pontos}}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
};

export default Historico;