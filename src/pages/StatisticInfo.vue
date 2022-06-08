<template>
    <q-page class="q-pa-lg">
        <div class="row q-pa-md" style="max-width:1220px">
            <div class="col">
                <q-card class="q-pa-md" flat bordered>
                    <div class="text-h6 text-center">Autonomiczny system pomiaru zmienności poziomu wód gruntowych</div>
                    <div class="text-subtitle3">System zainstalowano na potrzeby oceny wielkości wahań zwierciadła
                        wód gruntowych w rejonie północnej ściany hali Saint Gobain Innovative Materials Polska Sp. z
                        o.o.,
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
                    <div class="q-pa-md q-gutter-sm">
                        <q-banner dense rounded class="bg-primary text-white">
                            <template v-slot:avatar>
                                <q-icon name="pin" color="text-white" />
                            </template>
                            Numer seryjny modułu: <strong>656</strong>
                        </q-banner>
                        <q-banner dense rounded class="bg-primary text-white">
                            <template v-slot:avatar>
                                <q-icon name="format_list_numbered" color="text-white" />
                            </template>
                            Ilość odczytów: <strong> {{ statistics.totalNumberReadout }}</strong>
                        </q-banner>
                        <q-banner dense rounded class="bg-primary text-white">
                            <template v-slot:avatar>
                                <q-icon name="water" color="text-white" />
                            </template>
                            Średni poziom wody: <strong>{{ statistics.avgWaterLevel }}</strong> mppt <br>
                            Najwyższy poziom wody: <strong>{{ statistics.maxWaterLevel }}</strong> mppt<br>
                            Najniższy poziom wody: <strong>{{ statistics.minWaterLevel }}</strong> mppt
                        </q-banner>
                        <q-banner dense rounded class="bg-primary text-white">
                            <template v-slot:avatar>
                                <q-icon name="thermostat" color="text-white" />
                            </template>
                            Średni temperatura powietrza: <strong>{{ statistics.avgTemperature }}</strong> °C <br>
                            Najwyższa temperatura powietrza: <strong>{{ statistics.maxTemperature }}</strong> °C<br>
                            Najniższa temperatura powietrza: <strong>{{ statistics.minTemperature }}</strong>
                            °C
                        </q-banner>
                    </div>
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
            autoplay: ref(true),
        }
    },

    data() {
        return {
            statistics: {
                avgTemperature: "",
                avgWaterLevel: "",
                maxTemperature: "",
                maxWaterLevel: "",
                minTemperature: "",
                minWaterLevel: "",
                totalNumberReadout: ""
            }
        }
    },

    mounted() {
        this.getStatistics();
    },

    methods: {
        getStatistics: async function () {
            await this.$api
                .get("/readouts/statistics", {
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        Authorization: this.$q.localStorage.getItem("encodeCredential"),
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                .then((response) => {
                    this.loading = false;
                    this.show = false;
                    this.statistics = response.data;

                    this.formatStatistic();
                })
                .catch((error) => {
                    this.$q.notify({
                        color: "negative",
                        position: "top",
                        message: "Błąd pobierania statystyk.",
                        icon: "report_problem",
                    });
                });
        },

        formatStatistic() {
            this.statistics.avgWaterLevel = (Number(this.statistics.avgWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.maxWaterLevel = (Number(this.statistics.maxWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.minWaterLevel = (Number(this.statistics.minWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.avgTemperature = Number(this.statistics.avgTemperature).toFixed(2);
            this.statistics.maxTemperature = Number(this.statistics.maxTemperature).toFixed(2);
            this.statistics.minTemperature = Number(this.statistics.minTemperature).toFixed(2);
        }
    }
}
</script>
