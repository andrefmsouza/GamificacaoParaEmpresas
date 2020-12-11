import router from '../routes.js';

var sidebar = Vue.component('sidebar', {
    data: function(){
        return {
            menuAtivo: "",
            routes: []
        }
    },
    methods: {
        ativarMenu: function(menu){
            this.menuAtivo = menu;
        }
    },
    beforeMount(){
        this.routes = router.options.routes;
        this.menuAtivo = router.history.current.name;
    },
    template: `<nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <div class="mx-auto logo-sidebar">
                            <img alt="Logo" class="rounded-circle img-fluid" src="img/logo.png"/>
                        </div>
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="block m-t-xs font-bold">{{$root.$data.usuario.email}}</span>
                        </a>
                    </div>
                    <div class="logo-element">
                        <div class="mx-auto logo-sidebar">
                            <img alt="Logo" class="rounded-circle img-fluid" src="img/logo.png"/>
                        </div>
                    </div>
                </li>
                
                <!--li>
                    <a href="#"><i class="fa fa-th-large"></i> <span class="nav-label">Dashboards</span> <span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li><router-link :to="{ name: 'user'}">User</router-link></li>
                    </ul>
                </li-->
                
                <!--router-link to="/" tag="li"  :class="{ active : menuAtivo == 'home' }" >
                    <a href="#" @click="ativarMenu('home')"> 
                        <i class="fa fa-users"></i> 
                        <span class="nav-label">Home</span>
                    </a>
                </router-link>

                <router-link to="/ranking" tag="li" :class="{ active : menuAtivo == 'ranking' }" >
                    <a href="#"  @click="ativarMenu('ranking')"> 
                        <i class="fa fa-users"></i> 
                        <span class="nav-label">Ranking</span>
                    </a>
                </router-link-->

                <router-link v-for="route in routes[0].children" :to="route.path" tag="li" 
                    :class="{ active : menuAtivo == route.name }" 
                    v-if="route.admin == false || ( route.admin == true && $root.$data.usuario.admin == true )">
                    <a href="#"  @click="ativarMenu(route.name)"> 
                        <i v-bind:class="['fa', route.icon]"></i> 
                        <span class="nav-label">{{route.menu}}</span>
                    </a>
                </router-link>
            </ul>
        </div>
    </nav>`
});

export default sidebar;