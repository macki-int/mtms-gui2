<template>
<q-page class="flex flex-center">
    <!-- <q-page class="flex flex-center" style="background: linear-gradient(#61ABF9, #1E88F7);"> -->
    <div class="column q-pa-lg">
        <div class="row">
            <q-card square class="shadow-24" style="width: 400px; height:500px">
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
                <q-form class="q-px-sm q-pt-xl">

                </q-form>
                <q-card-section>
                    <q-input ref="nickUser" square clearable v-model="nickUser" type="text" lazy-rules :rules="[this.required,this.short]" label="Użytkownik">
                        <template v-slot:prepend>
                            <q-icon class="text-primary" name="account_box" />
                        </template>
                    </q-input>
                    <q-input ref="passwordUser" square clearable v-model="passwordUser" type="password" lazy-rules :rules="[this.required,this.short]" label="Hasło">
                        <template v-slot:prepend>
                            <q-icon class="text-primary" name="lock" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-actions class="q-px-lg">
                    <q-btn unelevated size="lg" color="primary" @click.prevent="login" class="full-width text-white" label="Zaloguj" />
                </q-card-actions>
            </q-card>
        </div>
    </div>
    <!-- src="~assets/quasar-logo-vertical.svg" -->
</q-page>
</template>

<script>
// import { useQuasar } from 'quasar'

import { ErrorCodes } from 'vue';

export default {
    name: 'IndexPage',

    mounted(){
        this.$q.localStorage.remove("encodeCredential");
    },

    data() {
        return {
            nickUser: '',
            passwordUser: ''
        }
    },

    methods: {
        
        async login() {
            // const $q = useQuasar();
            
            this.$refs.nickUser.validate();
            this.$refs.passwordUser.validate();

            const encode = btoa(this.nickUser + ':' + this.passwordUser);
            const encodeCredential = 'Basic ' + encode;

            await this.$api
                .get("/users/login", {
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        Authorization: encodeCredential,
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                .then((response) => {
                    try {
                        this.$q.localStorage.set("encodeCredential", encodeCredential);
                    } catch (e) {
                        console.log(e);
                    }
                    this.$router.push('/ReadoutsAll');
                })
                .catch((error) => {
                    // console.log(error.code);
                    // if (respo.code === 401) {
                        this.$q.notify({
                            color: "negative",
                            position: "top",
                            message: "Błąd logowania!",
                            icon: "report_problem",
                        });
                    // }
                });
        },
        required(val) {
            return (val && val.length > 0 || 'Pole musi być wypełnione');
        },

        short(val) {
            return (val && val.length > 4 || 'Tekst jest za krótki (minimum 5 znaków)');
        },

        // submit() {
        //     this.$refs.nickUser.validate()
        //     this.$refs.passwordUser.validate()
        // }

    }
};
</script>
