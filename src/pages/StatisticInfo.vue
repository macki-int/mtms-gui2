<template>
<q-page class="q-pa-lg">
    <div class="row q-pa-md" style="max-width:1220px">
    <div class="col">
        <q-card class="q-pa-md"  flat bordered>
            <div class="text-h6 text-center">Autonomiczny system pomiaru zmienności poziomu wód gruntowych</div>
            <div class="text-subtitle3">System zainstalowano na potrzeby oceny wielkości wahań zwierciadła
                wód gruntowych w rejonie północnej ściany hali Saint Gobain Innovative Materials Polska Sp. z o.o.,
                Sekurit Polska przy ul.Szklanych domów w Dąbrowie Górniczej na działce o nr ewid. 4179/5.</div>
        </q-card>
    </div>
    </div>
    <div class="row" style="max-width:1220px">
        <div class="col-7 q-pa-md">
            <q-card class="q-pa-md" style="height: 480px" flat bordered>

                <div class="q-pa-lg">
                    <q-carousel swipeable animated v-model="slide" :autoplay="autoplay" thumbnails infinite>

                        <q-carousel-slide :name="1" img-src="~assets/View1.jpg" />
                        <q-carousel-slide :name="2" img-src="~assets/View2.jpg" />
                        <q-carousel-slide :name="3" img-src="~assets/View3.jpg" />
                        <q-carousel-slide :name="4" img-src="~assets/View4.jpg" />
                        <q-carousel-slide :name="5" img-src="~assets/View5.jpg" />
                        <q-carousel-slide :name="6" img-src="~assets/View6.jpg" />
                    </q-carousel>
                </div>
            </q-card>
        </div>
        <div class="col-5 q-pa-md">
            <q-card class="q-pa-lg" style="height: 480px" flat bordered>
                <q-list>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="pin" class="text-primary" />
                        </q-item-section>
                        <q-item-section>Numer seryjny modułu:</q-item-section>
                        <q-item-section side>Side</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon name="format_list_numbered" class="text-primary" />
                        </q-item-section>
                        <q-item-section>Ilość odczytów:</q-item-section>
                        <q-item-section side>Side</q-item-section>
                    </q-item>
                    <q-item>
                        
                        <q-item-section avatar>
                            <q-icon name="water" class="text-primary" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Średni poziom wody:</q-item-label>
                            <q-item-label caption>Najwyższy poziom wody:</q-item-label>
                            <q-item-label caption>Najniższy poziom wody:</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>

                        <q-item-section avatar>
                            <q-icon name="thermostat" class="text-primary" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Średni temperatura powietrza:</q-item-label>
                            <q-item-label caption>Najwyższa temperatura powietrza:</q-item-label>
                            <q-item-label caption>Najniższa temperatura powietrza:</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </div>
    </div>
</q-page>
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
