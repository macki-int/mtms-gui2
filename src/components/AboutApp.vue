<template>
<div class="q-pa-md" style="max-width: 50vh">
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
        <q-card-section class="bg-primary">
            <div class="row">
                <div class="column">
                    <img alt="MTms logo" src="~assets/logo.png" style="width: 120px; height: 120px">
                </div>
                <div class="column">
                    <h2 class="text-h2 text-white q-my-lg q-ml-lg"><strong>MTMS</strong></h2>
                </div>
            </div>
        </q-card-section>
        <q-card-section class="text-primary text-right">
            <strong>MT & TROLL-Systems</strong> © 2022 
        </q-card-section>

        <q-card-actions align="right">
            <q-btn color="primary" label="OK" @click="onOKClick" />
        </q-card-actions>
    </q-card>
</q-dialog>
</div>
</template>

<script>
export default {
    name: 'AboutApp',

    emits: [
        'hide'
    ],

    methods: {
        show: function () {
            this.$refs.dialog.show();
        },

        hide() {
            this.$refs.dialog.hide()
        },

        onDialogHide() {
            this.$emit('hide')
        },

        onOKClick() {
            this.hide()
        },
    }
}
</script>
