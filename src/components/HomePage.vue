<template>
<div><navbar />
<section class="hero is-fullheight has-bg-img "> 
    <div class="hero-body">
        

        <div id="all" class="postition2 has-background-light tile is-4 is-vertical container box">      
    <br><br><br>
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
  >Sign in</button>

    <b-message class="jarak" title="Gagal Masuk!" v-model="isActive" type="is-danger" has-icon>
            Periksa ulang Email dan Password anda,
            mungkin belum pernah terdaftar sebelumnya. 
        </b-message> 
        <br><br>
        <p>Belum punya akun? <router-link class="jarak" :to="{ path: '/daftar' }">daftar</router-link> </p>
<br><br><br><br>
</div>
&nbsp;&nbsp;
        <img class="postition" src="../assets/ukk2021-2-tp.png">
    </div>
</section>    
</div>
</template>

<script>
import Navbar from "./Navbar.vue"
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
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}
.signin {
  margin-top: 200px;
  margin-right: 100px;
  width: 512px;
  height: 1080px;

}
.all {
    background-image: url("https://i.picsum.photos/id/1050/1230/500.jpg?hmac=e4pA3LUhJf21KhPvAyyNuP4rxXK3X0YoaWT04GH_aRM");

  background-position: center;

}
.has-bg-img { 
    background: url('http://orig14.deviantart.net/7584/f/2015/181/2/7/flat_mountains_landscape_by_ggiuliafilippini-d8zdbco.jpg')center center; 
    background-size:cover; }

.postition {
  position: sticky;
  left: 1000px;
}

.postition2 {
  position: sticky;
}

</style>