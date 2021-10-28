<template>
  <div id="app">
    <b-button icon-left="plus-circle" type="is-danger" size="is-large" @click="isActive= true">Edit Data</b-button>
    <b-modal class="is-card is-background" v-model="isActive">    
    <header class="modal-card-head" fixed-top>
      <p class="modal-card-title"><strong>Edit Data</strong></p>
    </header>
    <section class="modal-card-body">
    <DataEdit />
    </section>
    </b-modal>
  </div>
</template>

<script>
import DataEdit from "./DataEdit.vue";
export default {
  name: "App",
  data() {
    return {
        isActive: false,
    };
  },
  components:{
      DataEdit,
  },

  methods: {
    open() {
      this.$buefy.modal.open({
        parent: this,
        component: DataEdit,
        hasModalCard: true,
        customClass: "custom-class",
        trapFocus: true
      });
    }
  }
};
</script>