import api from '../api.js';
import router from '../routes.js';

var Base = { 
    data: function(){
      return {
        usuario: {}
      };
    },
    methods: {
    },
    beforeMount(){
      //Verifica as permissoes do usuario
      this.usuario = api.sessao();
      if( !this.usuario ){ router.push("/login"); return; }

      this.$root.$data.usuario = this.usuario;

      api.getUsuario(this.usuario.uid).then((u) => {
        this.usuario = Object.assign({admin: u.admin}, this.usuario);

        this.$root.$data.usuario = this.usuario;

        this.$forceUpdate();
      });
    },
    mounted(){
      inspinia();
    },
    template: `<div id="wrapper">
  
      <sidebar></sidebar>
  
      <div id="page-wrapper" class="gray-bg dashbard-1">

          <topnav></topnav>

          <div class="row  border-bottom dashboard-header">
            <router-view></router-view>
          </div>
  
        <footer-component></footer-component>

      </div>
  

    </div>`
};

export default Base;