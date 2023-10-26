<script setup lang="ts">
import { useCounterStore } from '@/stores/hospital';
import { ref, computed } from 'vue'
import type { HospitalDetail } from '../../api/hospital/type';

let store = useCounterStore()
let hos = computed<HospitalDetail | null>(() => store.hosDetail)

</script>

<template>
    <div class="container" v-if="hos != undefined">
        <h1>{{ hos.hospital.hosname }}预约通知</h1>
    </div>
</template>

<style scoped lang="scss">
.container{
    width: 100%;
    display: flex;
    justify-content: center;
}
h1 {
    font-weight: 520;
}
</style>@/stores/hospital