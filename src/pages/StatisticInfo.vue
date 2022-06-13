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
            <q-card class="q-pa-xs q-gutter-xs" style="height: 480px" flat bordered>
                <!-- <div class="q-item q-item-type row no-wrap q-pa-none rounded-borders bg-blue-7">
                    <div class="q-item__section column q-item__section--side justify-center q-pa-lg rounded-borders q-mr-none text-white bg-primary">
                        <i class="q-icon text-white notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">pin</i>
                    </div>
                    <div class="q-item__section column q-item__section--main justify-center q-pa-xs q-ml-xs text-white">
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Numer seryjny modułu</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">656</div>
                    </div>
                </div>
                <div class="q-item q-item-type row no-wrap q-pa-none rounded-borders bg-blue-7">
                    <div class="q-item__section column q-item__section--side justify-center q-pa-lg rounded-borders q-mr-none text-white bg-primary">
                        <i class="q-icon text-white notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">format_list_numbered</i>
                    </div>
                    <div class="q-item__section column q-item__section--main justify-center q-pa-xs q-ml-xs text-white">
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Ilość odczytów</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.totalNumberReadout }}</div>
                    </div>
                </div>
                <div class="q-item q-item-type row no-wrap q-pa-none rounded-borders bg-blue-7">
                    <div class="q-item__section column q-item__section--side justify-center q-pa-lg rounded-borders q-mr-none text-white bg-primary">
                        <i class="q-icon text-white notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">water</i>
                    </div>
                    <div class="q-item__section column q-item__section--main justify-center q-pa-xs q-ml-xs text-white">
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Średni poziom wody</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.avgWaterLevel }} mppt</div>
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Najwyższy poziom wody
                            ({{ maxWaterLevelDate }})</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.maxWaterLevel }} mppt</div>
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Najniższy poziom wody
                            ({{ minWaterLevelDate }})
                        </div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.minWaterLevel }} mppt</div>
                    </div>

                </div>
                <div class="q-item q-item-type row no-wrap q-pa-none rounded-borders bg-blue-7">
                    <div class="q-item__section column q-item__section--side justify-center q-pa-lg rounded-borders q-mr-none text-white bg-primary">
                        <i class="q-icon text-white notranslate material-icons" aria-hidden="true" role="presentation" style="font-size: 24px;">thermostat</i>
                    </div>
                    <div class="q-item__section column q-item__section--main justify-center q-pa-xs q-ml-xs text-white">
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Średnia temperatura
                            powietrza</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.avgTemperature }} °C</div>
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Najwyższa temperatura
                            powietrza
                            ({{ maxTemperatureDate }})</div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.maxTemperature }} °C</div>
                        <div class="q-item__label text-white text-h9 text-weight-bolder">Najniższa temperatura
                            powietrza
                            ({{ minTemperatureDate }})
                        </div>
                        <div class="q-item__label text-white text-h6 text-weight-bolder">{{
                            statistics.minTemperature }} °C</div>
                    </div>

                </div> -->

                <!-- </div> -->

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
                        Najwyższy poziom wody ({{ maxWaterLevelDate }}):
                        <strong>{{ statistics.maxWaterLevel }}</strong> mppt <br>
                        Najniższy poziom wody ({{ maxWaterLevelDate }}):
                        <strong>{{ statistics.minWaterLevel }}</strong> mppt
                    </q-banner>
                    <q-banner dense rounded class="bg-primary text-white">
                        <template v-slot:avatar>
                            <q-icon name="thermostat" color="text-white" />
                        </template>
                        Średnia temp. powietrza: <strong>{{ statistics.avgTemperature }} </strong> °C <br>
                        Najwyższa temp. powietrza ({{ maxTemperatureDate }}):
                        <strong>{{ statistics.maxTemperature }}</strong> °C<br>
                        Najniższa temp. powietrza ({{ minTemperatureDate }}):
                        <strong>{{ statistics.minTemperature }}</strong> °C
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
                maxTemperature: {
                    maxTemperature: "",
                    readoutDataTime: ""
                },
                maxWaterLevel: {
                    minWaterLevel: "",
                    readoutDataTime: ""
                },
                minTemperature: {
                    minTemperature: "",
                    readoutDataTime: ""
                },
                minWaterLevel: {
                    minWaterLevel: "",
                    readoutDataTime: ""
                },
                totalNumberReadout: ""
            },

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

                    this.maxTemperatureDate = this.statistics.maxTemperature.readoutDataTime;
                    this.minTemperatureDate = this.statistics.minTemperature.readoutDataTime;
                    this.maxWaterLevelDate = this.statistics.maxWaterLevel.readoutDataTime;
                    this.minWaterLevelDate = this.statistics.minWaterLevel.readoutDataTime;

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
            console.log(this.statistics);
            this.statistics.avgWaterLevel = (Number(this.statistics.avgWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.maxWaterLevel = (Number(this.statistics.maxWaterLevel.maxWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.minWaterLevel = (Number(this.statistics.minWaterLevel.minWaterLevel) * 10 - 2.4).toFixed(2);
            this.statistics.avgTemperature = Number(this.statistics.avgTemperature).toFixed(2);
            this.statistics.maxTemperature = Number(this.statistics.maxTemperature.maxTemperature).toFixed(2);
            this.statistics.minTemperature = Number(this.statistics.minTemperature.minTemperature).toFixed(2);

            this.maxTemperatureDate = this.maxTemperatureDate.split("T")[0];
            this.minTemperatureDate = this.minTemperatureDate.split("T")[0];
            this.maxWaterLevelDate = this.maxWaterLevelDate.split("T")[0];
            this.minWaterLevelDate = this.minWaterLevelDate.split("T")[0];

        }
    }
}
</script>
