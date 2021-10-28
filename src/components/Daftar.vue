<template>
    <section>
    <navbar></navbar>
<div id="all" class="has-background-light tile is-4 is-vertical container box">   
    <h3 class="title">DAFTAR</h3>
    <b-field label="Nama Lengkap" class=" has-text-left">
            <b-input v-model="nama" placeholder="Tulis Nama lengkap" icon="account"></b-input>
        </b-field>

    <b-field label="Email" class=" has-text-left">
          <b-input
                v-model="email"
                type="email" 
                placeholder="e.g. lupin@example.com"
                icon="email"></b-input>
    </b-field>         

        <b-field label="Password" class="has-text-left">
            <b-input 
                v-model="password"
                icon="key"
                type="password"
                placeholder="tulis password anda"
                password-reveal>
            </b-input>
        </b-field>
  <button 
  class="button is-primary" 
  expanded 
  @click="daftar()"
  :disabled="!isValid"  
  >Sign up</button>
  <b-message class="jarak" title="Gagal Mendaftar!" v-model="isActive" type="is-danger" has-icon>
            Periksa ulang Email dan Password anda,
            mungkin sudah pernah terdaftar sebelumnya
        </b-message>
<p>Sudah punya akun? <router-link class="jarak" :to="{ path: '/masuk' }">masuk</router-link> </p>
</div>    
    </section>
</template>

<script>
import Navbar from "./Navbar.vue";
import firebase from 'firebase';
import {fbdb} from "../firebase.js";

export default {
name: 'Signup',
components:{
    Navbar,

},    
data: function() {
    return {
        nama: '',
        email:'',
        password:'',
        isActive: false,
   };
},

methods: {
    daftar: function() {
        const loading=this.$buefy.loading.open()
        let Pendaftar = {
        NamaLengkap: this.nama,
        Email: this.email,
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        fbdb
        .ref("Pendaftar/")
        .push(Pendaftar)
      // Javascript Promise
         //   alert(`Account created for ${user.email}`);
         .then(
            () => {
            loading.close(); 
         //   alert(`Account created for ${user.email}`);
            this.$buefy.toast.open({
            message: "Berhasil Mendaftar!",
            type: "is-success",
        }), 
            this.$router.push('/aftersignup')
        }) 
        .catch(() => {
          loading.close(); 
          this.$buefy.toast.open({
            message: "Gagal Mendaftar!",
            type: "is-danger",
          });
          this.isActive = true
        });
    }
},
computed: {
    isValid() {
      if (this.nama == "" || this.email =="" || this.password == "") return false;
      else return true;
    },
},
};    
</script>

<style>
#all {
    margin-top: 100px ;
}

.jarak {
    margin-top: 5px ;
}
</style>