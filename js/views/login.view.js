import router from '../routes.js';
import api from '../api.js';

var Login = { 
    methods: {
        login: function(){        

          api.login(this.email, this.senha)
          .then(function(data){
            $("body").removeClass("gray-bg");
            router.push("/dashboard");
          }).catch(function(error) {
            alert("Usuário ou senha inválidos");
          });
        },
        router: {}
    },
    data: function(){
      return {
        email: '',
        senha: ''
      }
    },
    beforeMount(){
      api.onAuthStateChanged();
      this.router = router;
      
      $("body").addClass("gray-bg");
    },
    template: `<div class="middle-box text-center animated fadeInDown">
        <div>
            <div>
              <img src="img/logo.png" class="img-fluid" alt="Logo" />

              <h2>Login</h2>
              
              <br/><br/>
              <div class="row">
                <div class="col-6">
                  <strong>Administrador:</strong>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">login: admin@gpe.com</li>
                    <li class="list-group-item">senha: admingpe</li>
                  </ul>
                </div>
                <div class="col-6">
                  <strong>Usuário:</strong>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">login: user@gpe.com</li>
                    <li class="list-group-item">senha: usergpe</li>
                  </ul>
                </div>
              </div>
            </div>
            <br>
            <form class="m-t" role="form" v-on:submit.prevent="login">
                <div class="form-group text-left">
                  <h4>E-mail:</h4>
                  <input type="email" class="form-control" placeholder="E-mail" v-model="email" required="">
                </div>
                <div class="form-group text-left">
                  <h4>Senha:</h4>
                  <input type="password" class="form-control" placeholder="Senha" v-model="senha" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
            </form>
        </div>
        <!--hr>
        <button class="btn btn-primary btn-block" @click="router.push('/cadastro');">
          Cadastrar
        </button-->

        <br/><br/>
    </div>`
};

export default Login;