<script setup lang="ts">
import DetailNav from './detailNav/DetailNav.vue'
import { reqHospitalDetail } from '../api/hospital';
import type { HospitalDetail,HospitalDetailRes } from '../api/hospital/type';
import { useRoute } from 'vue-router'
import { watch,ref,onMounted } from 'vue'
import { useCounterStore } from '../stores/hospital';

let route = useRoute()
let store = useCounterStore()
//医院的code
let hosCode = String(route.query.hosCode)

//发送医院详情的请求
const loadData = async(hosCode: string) => {
    let res: HospitalDetailRes = await reqHospitalDetail(hosCode)
    
    //传递给pinia
    store.hosDetail = res.data
    store.hosCode = hosCode
}

onMounted(() => {  
    loadData(hosCode)
})
</script>

<template>
    <div class="hos-detail">
        <div class="navigation">
            <DetailNav></DetailNav>
        </div>
        <div class="seperator"></div>
        <div class="content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hos-detail{
    display: flex;
    margin-bottom: 20px;
    // overflow: visible;
}
.navigation{
    min-width: 16%;
}
.seperator{
    min-width: 1px;
    background-color: #e3e3e3;
}
.content{
    flex-grow: 1;
    padding: 15px 6% 0px 6%;
}
</style>../stores/hospital