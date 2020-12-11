import Base from './components/base.component.js';
import footer from './components/footer.component.js';
import sidebar from './components/sidebar.component.js';
import topnav from './components/topnav.component.js';

import Dashboard from './views/dashboard.view.js';
import Profile from './views/profile.view.js';
import AdmPontos from './views/adm_pontos.view.js';
import Ranking from './views/ranking.view.js';
import Historico from './views/historico.view.js';
import Objetivos from './views/objetivos.view.js';
import Produtos from './views/produtos.view.js';
import Loja from './views/loja.view.js';

import Login from './views/login.view.js';
import Cadastro from './views/cadastro.view.js';

var routes = [
    { 
        path: '*', 
        component: Base,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                menu: "Dashboard",
                icon: 'fa-trophy',
                component: Dashboard, 
                admin: false
            },
            {
                path: "/profile",
                name: "profile",
                menu: "Perfil",
                icon: 'fa-user',
                component: Profile, 
                admin: false
            },
            {
                path: "/adm_pontos",
                name: "adm_pontos",
                menu: "Adm Pontos",
                icon: 'fa-cogs',
                component: AdmPontos, 
                admin: true
            },
            {
                path: "/ranking",
                name: "ranking",
                menu: "Ranking",
                icon: 'fa-chart-line',
                component: Ranking, 
                admin: false
            },
            {
                path: "/historico",
                name: "historico",
                menu: "Histórico",
                icon: 'fa-clipboard',
                component: Historico, 
                admin: false
            },
            {
                path: "/objetivos",
                name: "objetivos",
                menu: "Objetivos",
                icon: 'fa-bullseye',
                component: Objetivos, 
                admin: true
            },
            {
                path: "/produtos",
                name: "produtos",
                menu: "Produtos",
                icon: 'fa-box',
                component: Produtos, 
                admin: true
            },
            {
                path: "/loja",
                name: "loja",
                menu: "Loja",
                icon: 'fa-shopping-cart',
                component: Loja, 
                admin: false
            }
        ]
    },
    { path: '/login', component: Login },
    { path: '/cadastro', component: Cadastro },
    { path: '/', redirect: '/dashboard'}
];

var router = new VueRouter({
    routes // short for `routes: routes`
});


export default router;