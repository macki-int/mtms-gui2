<template>
<div class="q-pa-xl" style="max-width: 100vh" >
    <q-carousel swipeable animated v-model="slide" height="50vh" :autoplay="autoplay" thumbnails infinite>
        <q-carousel-slide :name="1" img-src="~assets/View1.jpg" />
        <q-carousel-slide :name="2" img-src="~assets/View2.jpg" />
        <q-carousel-slide :name="3" img-src="~assets/View3.jpg" />
        <q-carousel-slide :name="4" img-src="~assets/View4.jpg" />
        <q-carousel-slide :name="5" img-src="~assets/View5.jpg" />
        <q-carousel-slide :name="6" img-src="~assets/View6.jpg" />
    </q-carousel>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'StatisticInfo',

    setup() {
        return {
            slide: ref(1),
            autoplay: ref(true)
        }
    }
}
</script>
