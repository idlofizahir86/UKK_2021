<template>
<div>
<Navbar></Navbar>
<div>
    <b-carousel
        :autoplay="true"
        with-carousel-list
        :indicator="false"
        :overlay="gallery"
        @click="switchGallery(false)">
        <b-carousel-item v-for="(item, i) in items" :key="i">
            <figure class="image">
                <img :src="item.image">
            </figure>
        </b-carousel-item>
        <span v-if="gallery" @click="switchGallery(false)" class="modal-close is-large"/>
        <template #list="props">
            <b-carousel-list
                v-model="props.active"
                :data="items"
                v-bind="al"
                @switch="props.switch($event, false)"
                as-indicator />
        </template>
        <template #overlay>
            <div class="has-text-centered has-text-white">
                Hello i'am overlay!
            </div>
        </template>
    </b-carousel>
</div>
</div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {

name: 'Masuk',
components:{
    Navbar,

},    
    data() {
        return {
            gallery: false,
            al: {
                hasGrayscale: true,
                itemsToShow: 2,
                breakpoints: {
                    768: {
                        hasGrayscale: false,
                        itemsToShow: 4
                    },
                    960: {
                        hasGrayscale: true,
                        itemsToShow: 6
                    }
                }
            },
            items: [
                {
                    title: 'Slide 1',
                    image: "https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/01.png"
                },
                {
                    title: 'Slide 2',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/02-adobespark.png'
                },
                {
                    title: 'Slide 3',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/03-adobespark.png'
                },
                {
                    title: 'Slide 4',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/04-adobespark.png'
                },
                {
                    title: 'Slide 5',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/05-adobespark.png'
                },
                {
                    title: 'Slide 6',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/06-adobespark.png'
                },
                {
                    title: 'Slide 7',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/07-adobespark.png'
                },
                {
                    title: 'Slide 8',
                    image: 'https://raw.githubusercontent.com/idlofizahir86/ukk2021/master/08-adobespark.png'
                }
            ]
        }
    },
    methods: {
        switchGallery(value) {
            this.gallery = value
            if (value) {
                document.documentElement.classList.add('is-clipped')
            } else {
                document.documentElement.classList.remove('is-clipped')
            }
        }
    }
}
</script>