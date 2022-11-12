<template>
  <q-inner-loading :showing="showing" color="primary" size="10em">
  </q-inner-loading>
  <q-page>
    <div class="q-pa-md" style="max-width: 150vh">
      <div class="row">
        <div class="col q-pa-sm" style="max-width: 25vh">
          <!-- <q-input dense v-model="dateFrom" mask="####-##-##" :rules="[(val) => isDate(val) || 'Błąd daty']"> -->
          <q-input dense v-model="dateFrom" mask="####-##-##">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateFrom" transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateFrom" @input="$refs.qDateFromTo.hide()" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Zamknij" color="primary" flat></q-btn>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col q-pa-sm" style="max-width: 25vh">
          <!-- <q-input dense v-model="dateTo" mask="####-##-##" :rules="[(val) => isDate(val) || 'Błąd daty']"> -->
          <q-input dense v-model="dateTo" mask="####-##-##">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateTo" transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateTo" @input="$refs.qDateTo.hide()" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Zamknij" color="primary" flat></q-btn>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col q-pa-sm q-gutter-sm">
          <q-btn color="primary" label="Filtruj" outline @click="filtered()">
            <q-tooltip class="bg-primary" :offset="[10, 10]">
              Pokaż odczyty dla podanego zakresu dat
            </q-tooltip>
          </q-btn>
          <q-btn v-if="isFiltered" color="negative" icon="close" outline @click="resetFiltered()">
            <q-tooltip class="bg-negative" :offset="[10, 10]">
              Usuń filtrowanie
            </q-tooltip>
          </q-btn>
          <q-btn v-if="isFiltered" color="primary" label="CSV" outline @click="saveAsCsv()">
            <q-tooltip class="bg-primary" :offset="[10, 10]">
              Zapisz przefiltrowane dane do pliku CSV
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <q-table color="primary" title="Zestawienie odczytów" :rows="readouts" dense flat :loading="loading"
        :columns="columns" row-key="readoutDataTime" :pagination="pagination" rows-per-page-label="Wierszy na stronę"
        :rows-per-page-options="[20, 25, 50, 100, 200]" @row-dblclick="showPromptForReadoutDescription">
        <!-- <template #loading> -->
        <!-- <q-inner-loading :showing="showing" color="primary" size="10em"> -->
        <!-- </q-inner-loading> -->
        <!-- </template> -->

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn padding="none" color="primary" outline icon="edit"
              @click="showPromptForReadoutDescription(evt, props.row)">
              <q-tooltip class="bg-primary">Edycja komentarza</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { exportFile, Loading, useQuasar } from 'quasar'
// import { ref } from 'vue'
import { date } from 'quasar'

const timeStampFrom = new Date(new Date().setMonth(new Date().getMonth() - 3));
const formattedStringFrom = date.formatDate(timeStampFrom, 'YYYY-MM-DD');
const timeStampTo = Date.now();
const formattedStringTo = date.formatDate(timeStampTo, 'YYYY-MM-DD');

export default {
  name: 'ReadoutsAll',
  mounted() {
    this.getReadouts();
  },

  data() {
    return {
      readouts: [],
      loading: true,
      showing: true,
      dateFrom: formattedStringFrom,
      dateTo: formattedStringTo,
      isFiltered: false,

      pagination: {
        // rowsPerPage:  50,
        sortBy: "readoutDataTime",
        descending: true,
        rowsPerPage: 24,
      },

      columns: [{
        name: "readoutDataTime",
        label: "Data odczytu",
        field: (row) => row.readoutDataTime.replace('T', ' '),
        align: "left",
        sortable: true,
      },
      {
        name: "pD",
        // label: "Poziom wody (Pd)",
        label: "Poziom wody",
        field: (row) => (row.pD * 10 - 2.4).toFixed(2) + " m",
        align: "right",
      },
      // {
      //   name: "p1",
      //   label: "Ciśnienie atmosferyczne (P1)",
      //   field: (row) => row.p1.toFixed(7),
      //   align: "right",
      // },
      {
        name: "tOb1",
        // label: "Temperatura powietrza (TOB1)",
        label: "Temperatura powietrza",
        field: (row) => row.tOb1.toFixed(2) + " °C",
        align: "right",
      },
      // {
      //   name: "pBaro",
      //   label: "Ciśnienie wody (P Baro)",
      //   field: (row) => row.pBaro.toFixed(7),
      //   align: "right",
      // },
      {
        name: "tBaro",
        // label: "Temperatura wody (T Baro)",
        label: "Temperatura wody",
        field: (row) => row.tBaro.toFixed(2) + " °C",
        align: "right",
      },
      {
        name: "description",
        label: "Komentarz",
        field: (row) => row.description,
        align: "left",
      },
      {
        name: "serialNumber",
        label: "SN modułu",
        field: (row) => row.transmitterParameterReading.serialNumber,
        align: "right",
      },
      {
        name: 'actions',

      },
      ],
    };
  },

  methods: {
    getReadouts: async function () {
      await this.$api
        .get("/readouts?sort=readoutDataTime,DESC", {
          contentType: "application/json",
          dataType: "json",
          headers: {
            Authorization: this.$q.localStorage.getItem("encodeCredential"),
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods":
            //   "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            // "Access-Control-Allow-Headers":
            //   "Origin, Content-Type, X-Auth-Token",
          },
        })
        .then((response) => {
          this.readouts = response.data;
          this.$q.notify({
            color: "positive",
            position: "top",
            message: "Pobrano wszystkie odczyty",
            icon: "check_circle",
          });
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Błąd pobierania danych",
            icon: "report_problem",
          });
        });

      this.loading = false;
      this.showing = false;
    },

    getReadoutsByDate: async function () {
      await this.$api
        .get("/readouts/fromto?dateFrom=" + this.dateFrom + "T00:00:00&dateTo=" + this.dateTo + "T00:00:00&sort=readoutDataTime,DESC", {
          contentType: "application/json",
          dataType: "json",
          headers: {
            Authorization: this.$q.localStorage.getItem("encodeCredential"),
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          this.readouts = response.data;
          this.$q.notify({
            color: "positive",
            position: "top",
            message: "Zastosowano filtrowanie dla podanego zakresu dat",
            icon: "check_circle",
          });
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Błąd pobierania danych",
            icon: "report_problem",
          });
          this.resetFiltered();
        });

      this.loading = false;
      this.showing = false;
    },

    showPromptForReadoutDescription: function (evt, row) {
      this.$q.dialog({
        message: "Wpisz komentarz dla odczytu: <strong>" + row.readoutDataTime.replace('T', ' ') + "</strong>",
        html: true,
        prompt: {
          model: row.description,
          type: "text"
        },
        ok: true,
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.saveDescriptionForReadout(row, data);
      })
    },

    saveDescriptionForReadout: async function (row, data) {
      await this.$api
        .patch("/readouts/descriptions/" + row.id, {
          description: data
        }, {
          headers: {
            Authorization: this.$q.localStorage.getItem("encodeCredential"),
            "Access-Control-Allow-Origin": "*"
          }
        }, {
          contentType: "application/json",
          dataType: "json"
        })
        .then((response) => {
          row.description = data;
          // console.log(response.status);
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Błąd zapisu komentarza",
            icon: "report_problem",
          });
        });
    },

    filtered: function () {
      if (this.checkDate()) {
        this.loading = true;
        this.showing = true;

        this.getReadoutsByDate();

        this.isFiltered = true;
      }
    },

    resetFiltered: function () {
      this.loading = true;
      this.showing = true;

      this.isFiltered = false;

      this.$q.notify({
        color: "warning",
        position: "top",
        message: "Usunięto filtrowanie",
        icon: "report_problem",
      });

      this.getReadouts();
    },

    saveAsCsv: function () {
      const readoutsWithoutNull = this.removeNullAndNestedObject(this.readouts);
      const fileName = this.setFileName();

      const status = exportFile(fileName, this.convertToCsv(readoutsWithoutNull), 'text/csv;charset=utf-8');

      if (status !== true) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Błąd zapisu do pliku",
          icon: "report_problem",
        });
      }


    },

    convertToCsv: function (readoutsForCsv) {
      const csvRows = [];

      const headers = Object.keys(readoutsForCsv[0]);
      csvRows.push(headers.join(','));

      for (const row of readoutsForCsv) {
        const values = headers.map(header => {
          const val = row[header]

          return `"${val + '"'}`;
        });

        csvRows.push(values.join(',', ','));
      }

      return csvRows.join('\n');
    },

    removeNullAndNestedObject: function (readouts) {
      const readoutsForCsv = [];

      const tempReadouts = readouts.map(obj => ({...obj}));

      tempReadouts.forEach(r => {
        Object.keys(r).forEach(
          (key) => (r[key] === null) ? r[key] = '' : r[key],

        r.readoutDataTime = r.readoutDataTime.replace('T', ' '),
        r.pD = r.pD * 10 - 2.4
        );

        const readoutForCsv = (({ id, pD, readoutDataTime, tBaro, tOb1, description }) =>
          ({ id, pD, readoutDataTime, tBaro, tOb1, description }))(r);
        readoutsForCsv.push(readoutForCsv);
      });

      return (readoutsForCsv);
    },

    setFileName: function () {
      const timeStampTo = Date.now();
      const formattedStringTo = date.formatDate(timeStampTo, 'YYYY-MM-DD_HH-mm-SS');

      return `odczyty_danych_${(formattedStringTo)}.csv`;
    },

    checkDate() {
      if (!Date.parse(this.dateFrom) || !Date.parse(this.dateTo)) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Podano błędną datę",
          icon: "report_problem",
        });
        this.isFiltered = false;

        return false;
      }

      return true;
    },

    isDate: function (value) {
      return /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(value);
    }
  },
};
</script>
