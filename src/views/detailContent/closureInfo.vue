<script setup lang="ts">
import { useCounterStore } from '@/stores/hospital';
import { ref, computed } from 'vue'
import type { HospitalDetail } from '../../api/hospital/type';

let store = useCounterStore()
let hos = computed<HospitalDetail | null>(() => store.hosDetail)

let description = '暂无信息'
</script>

<template>
    <div class="container" v-if="hos != undefined">
        <h1>{{ hos.hospital.hosname }}停诊信息</h1>
        <el-empty :description="description" />
    </div>
</template>

<style scoped lang="scss">
.container{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
h1 {
    font-weight: 520;
}
</style>@/stores/hospital