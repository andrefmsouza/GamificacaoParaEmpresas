import api from '../api.js';

var Ranking = {
    data: function(){
        return {
            pontuacoes: {},
            ranking: []
        };
    },
    methods: {
        calcula_ranking(usuarios){
            this.ranking = usuarios;
        }
    },
    beforeMount(){
        api.getListaUsuarios().then( (usuarios) => {
            this.calcula_ranking(usuarios);
        } );
    },
    computed: {
        orderedRanking: function () {
          return _.orderBy(this.ranking, 'pontos', ['desc'])
        }
    },
    template: `<div class="col-12">
        <h3>Ranking</h3>
        <hr>
        <div class="white-bg p-3">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th width="100">$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="obj in orderedRanking">
                        <th>{{obj.nome}}</th>
                        <th width="100">{{obj.pontos}}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
};

export default Ranking;