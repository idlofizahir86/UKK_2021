<template>
  <div>
        <div class="is-6 is-vertical container box">
      <br />
      <b-collapse
        class="panel"
        animation="slide"
        v-for="(c, index) of SemuaHasilUKK2021"
        :key="index"
      >
        <template #trigger="props">
          <div class="card-header" role="button">
            <p class="card-header-title">
              [{{ c.NomorInduk }}] || {{c.Kelas}} || {{c.NamaLengkap}} 
            </p>
            
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>
        <div class="card-content">
          <div class="content">
            Guru Pembimbing: <strong>{{c.GuruPembimbing}} </strong> <br>
            Capaian: <strong> {{c.HasilPencapaian}} </strong> <br>  
            Hasil Ujian: <strong>({{c.HasilUjian}})</strong>
            <br />
            <b-button
              @click="editClass()"
              
              type="is-danger"
              >Edit Data</b-button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <b-button
              @click="deleteClass(c.id)"
              
              type="is-danger"
              >Hapus Data</b-button>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
//import Navbar from "./Navbar.vue";
import {fbdb} from "../firebase.js"

export default {
  data() {
    return {
      NomorInduk: "",
      nama: "",
      kelas: "Pilih Kelas",
      guru: "Pilih Guru Pembimbing",
      hasil: "LULUS",
      isOpen: 0,
      HasilCapaian: [],
      SemuaHasilUKK2021: [],
    };
  },
  name: "DataEdit",
  components: {
  //  Navbar,
  },
  computed: {
    isValid() {
      if (this.NomorInduk == "" || this.nama == "" || this.kelas == "Pilih Kelas" || this.guru == "Pilih Guru Pembimbing" || this.HasilCapaian == "") return false;
      else return true;
    },
  },
  methods: {
    deleteClass(id) {
      this.$buefy.dialog.confirm({
                    title: 'Hapus Data',
                    message: 'Apakah anda yakin akan <b>menghapus</b> data ini? Dengan menghapus anda tidak dapat mengembailkannya',
                    confirmText: 'Hapus data',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$buefy.toast.open('Data Terhapus')
                })
      const dbref = fbdb.ref("DataHasilUKK2021/" + id);
      dbref.remove().then(() => {
        this.fetchDataHasilUKK2021();
      });
    },

    editClass(){
       this.$buefy.notification.open({
                    duration: 10000,
                    message: `Maaf Mengedit Data tidak diizinkan, silakan <b>Hapus Data</b>
                              dan menambahkan <b>Data</b> kembali. Terima Kasih🙏🏻`,
                    position: 'is-top-right',
                    type: 'is-danger',
                    hasIcon: true
                })
    },

    saveClass() {
      const loadingComponent = this.$buefy.loading.open();
      let DataHasilUKK2021 = {
        NomorInduk: this.NomorInduk,
        NamaLengkap: this.nama,
        Kelas: this.kelas,
        GuruPembimbing: this.guru,
        HasilPencapaian: this.HasilCapaian,
        HasilUjian: this.hasil,
      };
      // Javascript Promise
      fbdb
        .ref("DataHasilUKK2021/")
        .push(DataHasilUKK2021)
        .then(() => {
          this.NomorInduk = "";
          this.nama = "";
          this.kelas ="",
          this.guru = "";
          this.HasilCapaian = "";
          this.hasil = "Lulus";
          loadingComponent.close();
          this.$buefy.toast.open({
            message: "Successfully added a new class!",
            type: "is-success",
          });
          this.fetchDataHasilUKK2021();
        })
        .catch(() => {
          loadingComponent.close();
          this.$buefy.toast.open({
            message: "Gagal menambahkan data!",
            type: "is-danger",
          });
        });
    },
    fetchDataHasilUKK2021() {
      this.SemuaHasilUKK2021 = [];
      const dbref = fbdb.ref("DataHasilUKK2021/");
      dbref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          let UKK2021 = {
            id: childKey,
            ...childData,
          };
          this.SemuaHasilUKK2021.push(UKK2021);
        });
      });
    },
  },
  created() {
    this.fetchDataHasilUKK2021();
  },
};
</script>

<style>
.diri {
  display: inline-block;
  vertical-align: middle;
}

.jarak {
  margin-top: 100px;
}
</style>