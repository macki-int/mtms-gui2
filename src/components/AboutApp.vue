<template>
<q-dialog ref="dialog"  @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

        <q-card-actions align="right">
            <q-btn color="primary" label="OK" @click="onOKClick" />
        </q-card-actions>
    </q-card>
</q-dialog>
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
