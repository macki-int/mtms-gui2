<template>
<q-inner-loading :showing="showing" color="primary" size="10em">
</q-inner-loading>

<div class="q-pa-md" style="max-width: 150vh">

    <!-- <q-card> -->
    <!-- <q-card-section class="text-h6">
      </q-card-section>
      <q-card-section> -->
    <div ref="linechart" id="lineChart" style="height: 650px;"></div>
    <!-- </q-card-section> -->
    <q-resize-observer @resize="onResize" />
    <!-- </q-card> -->
    <!-- <q-btn flat color=“brown” size=“lg” align=“right” label=“WATCHING” @click="getReadouts" /> -->
</div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.js';

var readoutsData = [];
var readoutsDate = [];
var readoutsDescription = [];

export default {
    name: "LineChart",

    data() {
        return {
            readoutsDate: [],
            readoutsData: [],
            readoutsDescription: [],
            readouts: [],
            loading: true,
            showing: true,

            options: {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '60%'];
                    }
                },
                title: {
                    left: 'center',
                    text: 'Poziom wody gruntowej w rejonie północnej ściany hali Saint Gobain Innovative Materials Polska Sp. z o.o'
                },
                toolbox: {
                    show: true,
                    left: 'center',
                    itemSize: 20,
                    top: 35,
                    feature: {
                        // dataZoom: {
                        //   yAxisIndex: 'none'
                        // },
                        restore: {
                            show: true,
                            title: 'Zresetuj widok'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Zapisz jako obraz'
                        },
                        dataView:{
                            show: true,
                            title: 'Wyświetl wartości',
                            readOnly: true,
                            buttonColor: '#1976D2' ,
                        }
                    }
                },
                dataZoom: [{
                        type: 'slider',
                        xAxisIndex: 0,
                        filterMode: 'none'
                    },
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                        filterMode: 'none'
                    },
                    {
                        type: 'inside',
                        xAxisIndex: 0,
                        filterMode: 'none'
                    },
                    {
                        type: 'inside',
                        yAxisIndex: 0,
                        filterMode: 'none'
                    }
                ],

                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    top: '15%',
                    containLabel: true
                },

                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisPointer: {
                        lineStyle: {
                            color: '#1976D2',
                            width: 2
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    data: readoutsDate,
                }],
                yAxis: [{
                    name: 'Poziom terenu',
                    type: 'value',
                    axisLabel: {
                        formatter: "{value} m"
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: '#1976D2',
                            opacity: 0.5
                        }
                    }
                }],
                series: [{
                    data: readoutsData,
                    name: 'Poziom wody',
                    type: 'line',
                    showSymbol: false,
                    // symbolSize: 5,
                    //  sampling: 'average',
                    lineStyle: {
                        color: '#1976D2',
                        width: 3
                    },
                    smooth: true,
                    stack: 'Total',
                    areaStyle: {
                        // color: '#F2C037',
                        opacity: 0.7,

                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FFF'
                            },
                            {
                                offset: 1,
                                color: '#F2C037'
                            }
                        ])
                    },
                }]
            },
        }
    },

    mounted() {
        this.init();
        this.getReadouts();
    },

    methods: {
        init() {
            var lineChart = document.getElementById('lineChart');

            echarts.dispose(lineChart);

            this.line_chart = echarts.init(lineChart, null, {
                renderer: 'svg',
                // useDirtyRect: false
            });
            this.line_chart.setOption(this.options);
        },

        onResize() {
            if (this.line_chart) {
                this.line_chart.resize();
            }
        },

        getReadouts: async function () {
            await this.$api
                .get("/readouts?sort=readoutDataTime,ASC", {
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        Authorization: this.$q.localStorage.getItem("encodeCredential"),
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                .then((response) => {
                    this.readouts = response.data;
                    this.loading = false;
                    this.showing = false;
                })
                .catch((error) => {
                    console.log(error.response);
                    this.$q.notify({
                        color: "negative",
                        position: "top",
                        message: "Błąd pobierania danych.",
                        icon: "report_problem",
                    });
                });

            readoutsDate = [];
            readoutsData = [];
            readoutsDescription = [];

            for (var i = 0; i < this.readouts.length; i++) {
                readoutsDate.push(this.readouts[i].readoutDataTime.replace('T', ' '));
                readoutsData.push((this.readouts[i].pD * 10) - 2.4);
                readoutsDescription.push(this.readouts[i].description);
            }
        },
    }

}
</script>

<style scoped>
</style>
