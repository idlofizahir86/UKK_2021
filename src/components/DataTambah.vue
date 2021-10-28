<template>
  <div>

    <div class="is-6 is-vertical container box">
      <h1 class="title">Edit Data Hasil UKK 2021</h1>
      <!-- Content goes here -->
      <b-field label="Nomor Induk Siswa" class="has-text-left">
            <b-input
                v-model="NomorInduk"
                type="number"
                min="01"
                max="">
            </b-input>
        </b-field>
      <b-field label="Nama Lengkap Siswa" class="has-text-left">
        <b-input v-model="nama"></b-input>
      </b-field>
      <b-field label="Kelas" class="has-text-left">
            <b-select v-model="kelas" placeholder="Pilih Kelas">
                <option value="Pilih Kelas">Pilih Kelas</option>
                <option value="XII-A">XII-A</option>
                <option value="XII-B">XII-B</option>
                <option value="XII-C">XII-C</option>
            </b-select>
      </b-field>
      <b-field label="Guru Pembimbing" class="has-text-left">
            <b-select v-model="guru" placeholder="Nama Guru Pembimbing">
                <option value="Pilih Guru Pembimbing">Pilih Guru Pembimbing</option>
                <option value="Pak Huripudin">Pak Huripudin</option>
                <option value="Pak Oki Akbar">Pak Oki Akbar</option>
                <option value="Pak Irfan Gunawan">Pak Irfan Gunawan</option>
                <option value="Pak Cecep Rachman">Pak Cecep Rachman</option>
                <option value="Pak Rizki Almubarok">Pak Rizki Almubarok</option>
                <option value="Pak Deni Sukanda">Pak Deni Sukanda</option>
            </b-select>
        </b-field>
        <b-field label="Hasil Capaian" class="diri has-text-left">
        <div class="block diri">
            <b-checkbox v-model="HasilCapaian"
                native-value="Instalasi Debian">
                Instalasi Debian
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="IP Address">
                IP Address
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="DNS">
                DNS
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="Web Server">
                Web Server
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="FTP">
                FTP
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="Mail Server">
                Web Mail Server
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="Samba">
                Samba
            </b-checkbox>
            <b-checkbox v-model="HasilCapaian"
                native-value="Cacti">
                Cacti
            </b-checkbox>
        </div>
        </b-field>
      <b-field label="Keterangan Hasil Kelas" class="has-text-left">
        <div class="block">
          <b-radio v-model="hasil" class="has-text-success" native-value="LULUS">
            LULUS
          </b-radio>
          <b-radio v-model="hasil" class="has-text-danger" native-value="BELUM LULUS">
            BELUM LULUS
          </b-radio>
        </div>
      </b-field>
      <b-button
        type="is-primary"
        expanded
        @click="saveClass()"
        :disabled="!isValid"
        >Tambahkan Data</b-button
        >
    </div>
  </div>
</template>

<script>
//import Navbar from "./Navbar.vue";
import {fbdb} from "../firebase.js"

export default {
  data() {
    return {
      isActive: false,
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