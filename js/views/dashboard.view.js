import api from '../api.js';

var Dashboard = {
    data: function(){
        return {
            saldo: 0
        };
    },
    methods: {
        
    },
    beforeMount(){
        api.getUsuario(this.$root.$data.usuario.uid).then( (u) => {
            this.saldo = u.saldo;
        });
    },
    template: `<div class="col-12">
        <div class="row">
            <div class="col-12 col-sm-4">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Saldo Disponível</h5>
                    </div>
                    <div class="ibox-content text-center">
                        <button class="btn btn-block btn-success"><h2>$ {{saldo}}</h2></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
};

export default Dashboard;