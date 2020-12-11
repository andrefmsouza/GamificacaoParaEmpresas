var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC5TCqwGPQRn3MXvknAf3Lxoce8oaEd0Bk",
  authDomain: "gamificacaoparaempresas.firebaseapp.com",
  databaseURL: "https://gamificacaoparaempresas-default-rtdb.firebaseio.com",
  projectId: "gamificacaoparaempresas",
  storageBucket: "gamificacaoparaempresas.appspot.com",
  messagingSenderId: "809999549017",
  appId: "1:809999549017:web:1b159c55d7778d5d426748",
  measurementId: "G-N8PJK9B2W0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();