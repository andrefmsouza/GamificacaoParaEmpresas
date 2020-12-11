import router from './routes.js';

var api = {
    authListener: null,
    currentPath: "/dashboard",
    sessao: function(){
        return firebase.auth().currentUser;
    },
    onAuthStateChanged: function(){
        this.authListener = firebase.auth().onAuthStateChanged( (usuario) => {
            if(usuario){
                router.push(api.currentPath);
                $("body").removeClass("gray-bg");
            }
        });
    },
    login: function(email, senha){
        if( this.authListener )
            this.authListener();

        return firebase.auth().signInWithEmailAndPassword(email, senha);
    },
    signOut: function(){
        return firebase.auth().signOut();
    },

    //Registra um novo usuario
    register: function(email, senha, nome){
        return new Promise( (resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( (data) => {
              firebase.database().ref("usuarios/" + data.user.uid ).set({
                email: email,
                nome: nome,
                admin: false,
                saldo: 50,
                pontos: 50
              });
    
              firebase.database().ref("pontuacoes").push({
                player: data.user.uid,
                pontos: 50,
                motivo: "Cadastro",
                data: new Date().getTime()
              });

              resolve();
            } )
            .catch((error) => {
                reject(error);
            });
        } );
        
    },

    //Retorna os dados do usuario
    getUsuario: function(uid){
        return new Promise( (resolve, reject) => {
            firebase.database().ref("usuarios/" + uid).once("value", (snapshot) =>{
                let u = snapshot.val();
    
                resolve(u);
            });
        });
    },

    //Retorna a lista de usuarios
    getListaUsuarios: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref("usuarios/").once("value", (snapshot) =>{
                let u = snapshot.val();
    
                resolve(u);
            });
        });
    },

    //Atualiza os dados do usuario
    setUsuario: function( uid, data ){
        return new Promise( (resolve, reject) => {
            firebase.database().ref("usuarios/" + uid).set(data);
            
            resolve();
        });
    },
    
    //Retorna a lista de objetivos cadastrados
    getObjetivos: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('objetivos').once('value', ( snapshot) => {
                let o = snapshot.val();
    
                resolve(o);
            } );
        } );
    },

    //Retorna a lista de objetivos ativos
    getObjetivosAtivos: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('objetivos')
                .orderByChild("ativo")
                .equalTo( true )
                .once('value', ( snapshot) => {
                    let o = snapshot.val();
        
                    resolve(o);
            } );
        } );
    },

    //Atualiza os dados do objetivo
    setObjetivo: function( id, data ){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('objetivos/' + id).set(data);
            
            resolve();
        });
    },

    //Cria um novo objetivo
    createObjetivo: function(data){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('objetivos/').push(data);
            
            resolve();
        });
    },

    //Retorna a lista de pontuações distribuidas
    getPontuacoes: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('pontuacoes').once('value', ( snapshot) => {
                let pontuacoes = [];

                snapshot.forEach( (data) => {
                    let p = data.val();

                    p.data_str = new Date(p.data).toLocaleDateString();

                    pontuacoes.push(p);
                } );

                pontuacoes.sort(function(a, b) {
                    return b.data - a.data;
                });
    
                resolve(pontuacoes);
            } );
        } );
    },

    //Cria uma nova pontuacao
    createPontuacao(data, uid){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('pontuacoes').push(data);
            
            //Atualiza o saldo do usuario
            firebase.database().ref("usuarios/" + uid).once("value", (snapshot) => {
                let u = snapshot.val();

                firebase.database().ref("usuarios/" + uid + "/saldo").set( u.saldo + data.pontos );
                firebase.database().ref("usuarios/" + uid + "/pontos").set( u.pontos + data.pontos );

                resolve();
            });

        });
    },

    //Retorna a lista de produtos cadastrados
    getProdutos: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('produtos').once('value', ( snapshot) => {
                let o = snapshot.val();
    
                resolve(o);
            } );
        } );
    },

    //Atualiza os dados do produto
    setProduto: function( id, data ){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('produtos/' + id).set(data);
            
            resolve();
        });
    },

    //Cria um novo produto
    createProduto: function(data){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('produtos/').push(data);
            
            resolve();
        });
    },

    //Retorna a lista de produtos ativos
    getProdutosAtivos: function(){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('produtos')
                .orderByChild("ativo")
                .equalTo( true )
                .once('value', ( snapshot) => {
                    let o = snapshot.val();
        
                    resolve(o);
            } );
        } );
    },

    //Cria um novo resgate
    createResgate(data, uid, produto, pid){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('resgates').push(data);

            //Atualiza o saldo do usuario
            firebase.database().ref("usuarios/" + uid).once("value", (snapshot) => {
                let u = snapshot.val();

                let novo_saldo = parseFloat(u.saldo) - parseFloat(produto.preco);

                firebase.database().ref("usuarios/" + uid + "/saldo").set( novo_saldo );

                //Atualiza o estoque do produto
                firebase.database().ref('produtos/' + pid).once("value", (snapshot) => {
                    let p = snapshot.val();

                    let novo_estoque = parseInt(p.qtd) - 1;

                    firebase.database().ref('produtos/' + pid + '/qtd').set(novo_estoque);
                    resolve();
                });
            });
        });
    },

    //Retorna o historico de um usuario
    getHistoricoUsuario(uid){
        return new Promise( (resolve, reject) => {
            firebase.database().ref('pontuacoes')
                .orderByChild("player")
                .equalTo( uid)
                .once("value", (snapshot) => {
                
                let historico = [];

                snapshot.forEach( (data) => {
                    let p = data.val();

                    p.data_str = new Date(p.data).toLocaleDateString();

                    historico.push({
                        descricao: p.motivo,
                        data: p.data,
                        data_str: p.data_str,
                        pontos: p.pontos
                    });
                } );

                firebase.database().ref('resgates')
                    .orderByChild("player")
                    .equalTo( uid)
                    .once("value", (snapshot) => {

                    snapshot.forEach( (data) => {
                        let p = data.val();
        
                        p.data_str = new Date(p.data).toLocaleDateString();
        
                        historico.push({
                            descricao: "Resgate: " + p.produto_descricao,
                            data: p.data,
                            data_str: p.data_str,
                            pontos: ( p.pontos * -1 )
                        });
                    } );

                    historico.sort(function(a, b) {
                        return b.data - a.data;
                    });


                    resolve(historico);
                });
            });
        } );
    },

    addObjects: function(obj){
        return Object.assign(this, obj);
    }
};

export default api;