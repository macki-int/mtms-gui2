<template>
<q-page>
    <area-chart></area-chart>
</q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'
// import AreaChart from "components/AreaChart";

export default {
    name: 'ReadoutsChart',
    components: {
        AreaChart:defineAsyncComponent(()=>import('components/AreaChart'))
    }
};
</script>
