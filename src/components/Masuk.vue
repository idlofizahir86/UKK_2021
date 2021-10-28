<template>
    <section>
    <navbar></navbar>

<div id="all" class="has-background-light tile is-4 is-vertical container box">      
    <h3 class="title">MASUK</h3>
    <div class="field">
    <b-field label="Email" class=" has-text-left">
          <b-input
                v-model="email"
                type="email" 
                placeholder="e.g. lupin@example.com"
                icon="email"></b-input>
    </b-field>         
    </div>

        <b-field label="Password" class="has-text-left">
            <b-input 
                v-model="password"
                icon="key"
                type="password"
                placeholder="type your password"
                password-reveal>
            </b-input>
        </b-field>
  <button 
  class="button is-primary" 
  @click="masuk()"
  :disabled="!isValid"  
  >Masuk</button>

    <b-message class="jarak" title="Gagal Masuk!" v-model="isActive" type="is-danger" has-icon>
            Periksa ulang Email dan Password anda,
            mungkin belum pernah terdaftar sebelumnya. 
        </b-message> 
        <p>Belum punya akun? <router-link class="jarak" :to="{ path: '/daftar' }">daftar</router-link> </p>
</div>   

 
    </section>
</template>

<script>
import Navbar from "./Navbar.vue";
import firebase from 'firebase';

export default {
name: 'Masuk',
components:{
    Navbar,

},    
data: function() {
    return {
        email:'',
        password:'',
        isActive: false,
   };
},

methods: {
    masuk: function() {
        const loading=this.$buefy.loading.open()
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
            () => {
            loading.close(); 
         //   alert(`Account created for ${user.email}`);
            this.$buefy.toast.open({
            message: "Berhasil Masuk!",
            type: "is-success",
        });
            this.$router.push('/dashboard');
          })  
        .catch(() => {
          loading.close();
          this.$buefy.toast.open({
            message: "Gagal Masuk!",
            type: "is-danger",
          });
          this.isActive = true
        });
    }
        
},

computed: {
    isValid() {
      if (this.email =="" || this.password == "") return false;
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
    margin-top: 15px ;
}
</style>
