import router from '../routes.js';
import api from '../api.js';

var topnav = Vue.component('topnav', {
    methods: {
      logout: function(){
        api.signOut().then(function() {
          // Sign-out successful.
          router.push("/login");
        }).catch(function(error) {
          // An error happened.
          console.log(error);
          alert("Ocorreu um erro ao fazer o logout.");
        });
      }
    },
    template: `<div class="row border-bottom white-bg">
      <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <a @click="logout()">
                    <i class="fa fa-sign-out-alt"></i> Log out
                </a>
            </li>
        </ul>
      </nav>
    </div>`
});

export default topnav;