<template>
  <div id="app">
    <b-button icon-left="plus-circle" type="is-success" size="is-large" @click="isActive= true">Tambahkan Data</b-button>
    <b-modal class="is-card is-background" v-model="isActive">
    <section class="modal-card-body">
    <DataTambah />
    </section>
    </b-modal>
  </div>
</template>
<script>
import DataTambah from "./DataTambah.vue";
export default {
  name: "App",
  data() {
    return {
    isActive: false,
    };
  },
  components:{
      DataTambah,
  },
  methods: {
    open() {
      this.$buefy.modal.open({
        parent: this,
        component: DataTambah,
        hasModalCard: true,
        customClass: "custom-class",
        trapFocus: true
      });
    }
  }
};
</script>