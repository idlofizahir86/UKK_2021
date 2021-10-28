<template>
<div>
  <Navbar />
<h1 class="judul title">TENTANG</h1> 
<p class="aing has-text-left">
Ini adalah Tampilan Web yang dibuat oleh <b>Idlofi Zahir Rajaba</b>
menggunakan <i>framework</i> Vuejs dan juga <i>styling library</i> dari Buefy.
<br>
<br>
<img src="../assets/ukk2021-3.png">
<br><br><br><br>
Semoga UKK 2021 diberikan Hasil yang terbaik.
  </p>
</div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  
  components:{
    Navbar,
  },
};
</script>

<style>

.judul{
  margin-top: 10px;
}

.aing{
  margin-left: 110px;
}
</style>