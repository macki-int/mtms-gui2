<template>
    <q-page>
        <div>
            <line-chart></line-chart>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
// import AreaChart from "components/AreaChart";

export default defineComponent({
    name: "ReadoutsChart",
    components: {
        LineChart: defineAsyncComponent(() => import('components/LineChart'))
    }
})
</script>
