<template>
    <b-navbar fixed-top class="has-background-primary-light">
        <template #brand>
            <b-navbar-item v-if="!isSignedIn" class="iya" tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/ukk2021-3-tp.png"
                    alt="UKK 2021 logo"
                >
            </b-navbar-item>
                <b-navbar-item v-if="isSignedIn" class="iya" tag="router-link" :to="{ path: '/dashboard' }">
                <img
                    src="../assets/ukk2021-3-tp.png"
                    alt="UKK 2021 logo"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item v-if="!isSignedIn" tag="router-link" :to="{ path: '/' }">
                Home
            </b-navbar-item>
            <b-navbar-item v-if="isSignedIn" tag="router-link" :to="{ path: '/dashboard' }">
                Home
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item tag="router-link" :to="{ path: '/dokumentasi' }">
                Dokumentasi
            </b-navbar-item>
                <b-navbar-item v-if="isSignedIn" tag="router-link" :to="{ path: '/data/admin/hasilukk2021' }">
                Hasil UKK 2021
                </b-navbar-item>
                <b-navbar-item v-if="!isSignedIn" tag="router-link" :to="{ path: '/data/hasilukk2021' }">
                Hasil UKK 2021
                </b-navbar-item>
                <b-navbar-item tag="router-link" :to="{ path: '/tentang' }">
                Tentang
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item style="right: 50%" v-if="isSignedIn"><span class="email has-text-black">
                <strong>{{currentUser}}</strong></span>
            </b-navbar-item>
            &nbsp;
            <b-navbar-item v-if="!isSignedIn" tag="router-link" :to="{ path: '/daftar' }">
                    <a class="button is-primary">
                        <strong>Daftar</strong>
                    </a>
            </b-navbar-item>
            <b-navbar-item v-if="!isSignedIn" class="iyalagi" tag="router-link" :to="{ path: '/masuk' }">
                    <a  class="button is-info-light">
                        Masuk
                    </a>
            </b-navbar-item>
            <b-navbar-item @click="keluar()" v-if="isSignedIn">
                    <a class="button is-dark">
                        Keluar
                    </a> 
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Navbar',
  data(){
    return {
        isSignedIn: false,
        currentUser: false,
    }
  },
  created() {
    if(firebase.auth().currentUser) {
        this.isSignedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
    }
  },

  methods: {
      keluar: function() {
          const loading=this.$buefy.loading.open()
          firebase.auth().signOut().then(() => {
              loading.close();
              this.$buefy.toast.open({
            message: "Berhasil Keluar",
            type: "is-success",              
          });
          this.$router.push('/masuk');
      })
      }
  },
};
</script>

<style>

.iya {
    margin-left: 100px;
    margin-right: 10px;
}

.iyalagi {
    margin-left: 5px;
    margin-right: 100px;
}

</style>