<template>
<q-layout view="hHh Lpr lff">
    <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title> MT Measuring System </q-toolbar-title>

            <div class="cursor-pointer" @click="showInfoDialog">mtms v{{ $q.version }}</div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
        <q-scroll-area class="fit">
            <div class="text-primary">
                <q-list>
                    <q-item-label header> </q-item-label>
                    <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
                </q-list>
            </div>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import EssentialLink from "components/EssentialLink.vue";
import AboutApp from "components/AboutApp.vue";

export default defineComponent({
    name: "MainLayout",

    components: {
        EssentialLink,
    },

    setup() {
        const leftDrawerOpen = ref(true);
        const $q = useQuasar();

        function showInfoDialog() {
            $q.dialog({
                component: AboutApp,
            })
        };

        return {
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },

            showInfoDialog
        };
    },

    methods: {

    }
});

const linksList = [{
        title: "Tabela danych",
        caption: "lista odczytów",
        icon: "article",
        to: "ReadoutsAll",
    },
    {
        title: "Wykres",
        caption: "wizualizacja danych",
        icon: "insights",
        to: "ReadoutsChart",
    },
    {
        title: "Statystyki",
        caption: "informacje dodatkowe",
        icon: "settings_suggest",
        to: "StatisticInfo",
    },
    {
        title: "Logout",
        caption: "wyloguj",
        icon: "lock_person",
        to: "/",
    },
];
</script>
