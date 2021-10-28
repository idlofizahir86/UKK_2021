<template>
<div>
<Navbar />
    <section>
<div class="jarak">
<div class="has-background-light tile is-7 is-vertical container box">
        <b-table
            :data="SemuaHasilUKK2021"
            ref="table"
            paginated
            per-page="5"
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="id"
            :detail-transition="transitionName"
            @details-open="(row) => $buefy.toast.open(`Membuka <b> ${row.NamaLengkap} </b>`)"
            :show-detail-icon="showDetailIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

            <b-table-column field="NomorInduk" label="Nomor Induk" centered searchable sortable width="40" numeric v-slot="props">
                {{ props.row.NomorInduk }}
                
            </b-table-column>

            <b-table-column field="NamaLengkap" class="has-text-centered" searchable centered label="Nama Lengkap" sortable v-slot="props">
                <template v-if="showDetailIcon">
                    {{ props.row.NamaLengkap }}
                </template>
                <template v-else>
                    <a @click="props.toggleDetails(props.row)">
                        {{ props.row.NamaLengkap }}
                    </a>
                </template>
            </b-table-column>

            <b-table-column field="Kelas" label="Kelas" centered sortable v-slot="props">
                {{ props.row.Kelas }}
            </b-table-column>

            <b-table-column field="GuruPembimbing" centered label="Guru Pembimbing" sortable v-slot="props">
                {{ props.row.GuruPembimbing }}
            </b-table-column>

            <template
    v-if="SemuaHasilUKK2021.searchable && !SemuaHasilUKK2021.numeric"
    #searchable="props">
    <b-input
        v-model="props.filters[props.column.field]"
        placeholder="Search..."
        icon="magnify"
        size="is-small" />
</template>
            <template #detail="props">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <p>
                                HASIL UJIAN: <strong> {{ props.row.HasilUjian }}</strong>
                                <br>
                                <strong> PENCAPAIAN: </strong> {{ props.row.HasilPencapaian }}                              
                                
                            </p>
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
</div>
</div>
<br>
    </section>
</div>
</template>

<script>
import Navbar from "./Navbar.vue";
import {fbdb} from "../firebase.js"
//import EditData from "./Modal2.vue"
//import TambahData from "./Modal.vue"

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
    Navbar,
  //  EditData,
  //  TambahData,
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
.jarak {
  margin-top: 70px;
}
</style>