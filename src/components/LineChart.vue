<template>
  <div>
    <!-- <q-card> -->
    <!-- <q-card-section class="text-h6">
        Stacked Area Chart
      </q-card-section>
      <q-card-section> -->
    <div ref="linechart" id="lineChart" style="height: 650px;"></div>
    <!-- </q-card-section> -->
    <!-- <q-resize-observer @resize="onResize"/> -->
    <!-- </q-card> -->
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.js';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
var readoutsData = [];
var readoutsDate = [];

export default {
  name: "LineChart",

  data() {
    return {
      readoutsDate: [],
      readoutsData: [],
      readouts: [],

      options: {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '60%'];
          }
        },
        title: {
          left: 'center',
          text: 'Pomiar poziomu wody'
        },
        toolbox: {
          left: 'center',
          itemSize: 25,
          top: 35,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 20
          }],

        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '15%',
          containLabel: true
        },

        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
            name: 'Poziom terenu',
            type: 'value',
            splitArea: {
              show: true,
              areaStyle: {
                color: '#1976D2',
                opacity: 0.5
                //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: '#FFF'
                //   },
                //   {
                //     offset: 1,
                //     color: '#1976D2'
                //   }
                // ])
              }
            }
          }
        ],
        series: [
          {
            name: 'Poziom wody',
            type: 'line',
            showSymbol: false,
            // symbolSize: 5,
            //  sampling: 'average',
            lineStyle: {
              normal: {
                color: '#1976D2',
                width: 3
              }
            },
            smooth: true,
            stack: 'Total',
            areaStyle: {
              // color: '#F2C037',
              opacity: 0.7,

              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFF'
                },
                {
                  offset: 1,
                  color: '#F2C037'
                }
              ])
            },
            // emphasis: {
            //   focus: 'series'
            // },
            data: readoutsData,
          }
        ]
      },
    }
  },

  mounted() {
    this.getReadouts();
    this.init();
  },

  watch: {
    '$q.dark.isActive': function () {
      this.init();
    }
  },

  methods: {
    init() {
      var lineChart = document.getElementById('lineChart');
      this.line_chart = echarts.init(lineChart, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      this.line_chart.setOption(this.options)
    },

    onResize() {
      if (this.line_chart) {
        this.line_chart.resize();
      }
    },

    getReadouts: async function () {
      await this.$api
        .get("/readouts", {
          contentType: "application/json",
          dataType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          this.readouts = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response === 403) {
            this.$q.notify({
              color: "negative",
              position: "top",
              message: "Nie masz uprawnień lub zostałeś wylogowany",
              icon: "report_problem",
            });
          }
        });

      readoutsDate = [];
      readoutsData = [];

      for (var i = 0; i < this.readouts.length; i++) {
        readoutsDate.push(this.readouts[i].readoutDataTime);
        readoutsData.push((this.readouts[i].pD * 10) - 2.4);
      }
    },
  }

}
</script>

<style scoped>
</style>
