import router from './routes.js';
import api from './api.js';

var app = new Vue({
    router,
    data: {
        usuario: {}
    },
    methods: {
        verifica_sessao: function(path){
            if( !api.sessao() && ( path != "/login" && path != "/cadastro" ) ){
                router.push("/login");
            }
        }
    },
    watch: {
        '$route': function (to, from) {
            api.currentPath = from.path;
            this.verifica_sessao( to.path );
        }   
    },
    beforeMount(){
        this.verifica_sessao(this.$route.path);
    }
}).$mount('#app');