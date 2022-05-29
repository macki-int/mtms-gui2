<template>
<q-page>
    <div class="q-pa-md" style="max-width: 150vh">
        <q-table title="Zestawienie odczytów" :rows="readouts" dense flat :columns="columns" row-key="name" :pagination="pagination" @row-dblclick="showPromptForReadoutDescription">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn padding="none" color="primary" outline icon="edit" @click="showPromptForReadoutDescription(evt, props.row)">
                        <q-tooltip class="bg-primary">Edycja komentarza</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </div>
</q-page>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
    name: 'ReadoutsAll',

    mounted() {
        this.getReadouts();
    },

    data() {
        return {
            readouts: [],

            pagination: {
                sortBy: "type",
                descending: false,
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
                .get("/readouts", {
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
                })
                .catch((error) => {
                    this.$q.notify({
                        color: "negative",
                        position: "top",
                        message: "Błąd pobierania danych.",
                        icon: "report_problem",
                    });
                });
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
                        message: "Błąd zapisu komentarza.",
                        icon: "report_problem",
                    });
                });
        }
    },
};
</script>
