<template>
<div><navbar />
<section class="hero is-fullheight has-bg-img "> 
    <div class="hero-body">
       <img class="postition" src="../assets/ukk2021-2-tp.png">
    </div>  
</section>    
</div>
</template>

<script>
import Navbar from "./Navbar.vue"

export default {
name: 'Masuk',
components:{
 Navbar,

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