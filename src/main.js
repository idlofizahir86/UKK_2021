import Vue from 'vue'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import Dashboard from './components/HabisMasuk.vue'
import Daftar from './components/Daftar.vue'
import Masuk from './components/Masuk.vue'
import TentangPage from './components/TentangPage.vue'
import Dokumentasi from './components/Dokumentasi.vue'
import HasilUKK from './components/HasilUKK.vue'
import editUKK from './components/HasilUKKadmin.vue'

Vue.config.productionTip = false
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueRouter from "vue-router";
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueRouter);
Vue.use(Buefy);

const routes = [
{ path: "/", name: 'home', component: HomePage, 
  meta: {
    requiresGuest: true,
}
},
{ path: "/dashboard", name: 'dashboard', component: Dashboard, 
  meta: {
    requiresAuth: true,
}
},
{ path: "/daftar", name: 'daftar', component: Daftar, 
  meta: {
  requiresGuest: true,
}
},
{ path: "/masuk", name: 'masuk', component: Masuk, 
  meta: {
  requiresGuest: true,
}
},
{ path: "/tentang", name: 'tentang', component: TentangPage,
  meta: {
  
}
},
{ path: "/dokumentasi", name: 'dokumentasi', component: Dokumentasi,
  meta: {
  
}
},
{ path: "/data/admin/hasilukk2021", name: 'hasilUKK2021admin', component: editUKK,
  meta: {
    requiresAuth: true,
}
},
{ path: "/data/hasilukk2021", name: 'hasilUKK2021', component: HasilUKK,
  meta: {
  requiresGuest: true,
}
},
]

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check Kalo gak Login
    if(!firebase.auth().currentUser){
      //Ke Login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Lanjut ke Route
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)){
    // Check Kalo Login
    if(firebase.auth().currentUser){
      //Ke Login
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //Lanjut ke Route
      next();
    }
  } else {
    //Lanjut ke Route
    next();
  }
});

export default router;

let app;
firebase.auth().onAuthStateChanged(() => {
 if(!app){
    app = new Vue({
      render: (h) => h(App),
      router,
    }).$mount("#app");
  }
})


import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import './firebase.js'

const firebaseConfig = {
  apiKey: "AIzaSyDmdeAuBSpQJYi9hiiueqnrZJyBEcn9ltA",
  authDomain: "ukk-2021.firebaseapp.com",
  databaseURL: "https://ukk-2021-default-rtdb.firebaseio.com",
  projectId: "ukk-2021",
  storageBucket: "ukk-2021.appspot.com",
  messagingSenderId: "1034294319495",
  appId: "1:1034294319495:web:152b30872cc10aabaf5b22"
};


  firebase.initializeApp(firebaseConfig);
