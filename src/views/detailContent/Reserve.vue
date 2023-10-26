<script setup lang="ts">
import { useCounterStore } from '@/stores/hospital';
import { reactive, ref,computed } from 'vue'
import type { Department, HospitalDetail } from '../../api/hospital/type';
import { reqHospitalDepartment } from '../../api/hospital';
import { useRoute } from 'vue-router';
import SlideMenu from './slideMenu/slideMenu.vue';

let store = useCounterStore()
let route = useRoute()

let hos = computed<HospitalDetail | null>(() => store.hosDetail)

let departments = ref<Department[]>()
//获取医院科室
const loadDepartment = async (hoscode: string) => {
    let res = await reqHospitalDepartment(hoscode)
    departments.value = res.data
    console.log(res);
} 
loadDepartment(String(route.query.hosCode))

</script>

<template>
<div class="container" v-if="hos != undefined">
        <div class="top-entry">
            <img class="logo" :src="`data:image/jpeg;base64,${hos.hospital.logoData}`" />
            <div class="discription">
                <h1 class="hos-name">{{ hos.hospital.hosname }}</h1>
                <div class="level">
                    <span class="hos-type">{{ hos.hospital.param.hostypeString }}</span>
                    <svg t="1693452750917" class="icon like" viewBox="0 0 1078 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4012" width="16" height="16">
                        <path
                            d="M658.245834 1024C418.607781 1024 36.569213 1024 36.569213 1024 12.177548 1024 0 1007.507285 0 987.430787L0 438.892592C0 418.816094 17.077823 402.323379 36.569213 402.323379L255.98449 402.323379C275.841574 402.323379 311.386848 409.27153 323.89352 422.984985 366.386945 387.841971 478.946982 278.390316 478.946982 105.38137 478.946982 1.707651 581.560194 1.159113 581.560194 1.159113 581.560194 1.159113 767.368365-30.875518 767.368365 244.30781 767.368365 304.025335 731.384259 402.323379 731.384259 402.323379L841.091898 402.323379C841.091898 402.323379 1150.796563 348.712913 1060.507176 694.877084 978.9944 1007.470715 899.310085 1024 658.245834 1024L658.245834 1024ZM73.138426 475.461805 73.138426 950.861574 219.415278 950.861574 255.98449 950.861574 255.98449 475.461805 255.98449 475.461805 73.138426 475.461805ZM841.091898 475.461805 585.107408 475.461805C585.107408 475.461805 698.947367 367.509489 698.947367 226.937434 698.947367 86.365379 637.693936 70.640618 598.674586 70.640618 559.655236 70.640618 547.36798 83.110719 547.36798 105.38137 547.36798 365.315336 329.122916 512.031018 329.122916 512.031018L329.122916 950.861574C329.122916 950.861574 473.827293 950.861574 658.245834 950.861574 842.664375 950.861574 920.776213 945.705315 987.36875 694.877084 1060.580315 419.218356 841.091898 475.461805 841.091898 475.461805L841.091898 475.461805Z"
                            fill="#272636" p-id="4013"></path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="seperator"></div>
        <div class="bottom-entry">
            <div class="hospital-rule">
                <div class="title line-spacing">挂号规则</div>
                <div class="inner-rule">
                    <div class="time-info line-spacing">
                        <div class="cycle spacing">
                            预约周期：{{ hos.bookingRule.cycle }}天
                        </div>
                        <div class="release spacing">
                            放号时间：{{ hos.bookingRule.releaseTime }}
                        </div>
                        <div class="stop spacing">
                            停挂时间：{{ hos.bookingRule.stopTime }}
                        </div>
                    </div>
                    <div class="address line-spacing">具体地址:{{ hos.hospital.param.fullAddress }}</div>
                    <div class="address line-spacing">推荐路线:{{ hos.hospital.route }}</div>
                    <div class="address line-spacing">退号时间:就诊前{{ -hos.bookingRule.quitDay }}工作日{{ hos.bookingRule.stopTime }}前取消</div>
                </div>
            </div>
            <div class="booking-rule">
                <div class="title line-spacing">医院预约规则</div>
                <div class="inner-rule">
                    <div v-for="(item,index) in hos.bookingRule.rule" :key="index">{{ `${index + 1}、${item}` }}</div>
                </div>
            </div>
        </div>
        <div class="departments">
            <SlideMenu :itemArr="departments"></SlideMenu>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 100%;
}

.top-entry {
    display: flex;
}

.logo {
    width: 100px;
    margin-right: 15px;
}

.discription {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.icon{
    cursor: pointer;
}
.hos-name {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 15px;
}
.level{
    display: flex;
    align-items: center;
}
.hos-type {
    margin-right: 15px;
}

.seperator {
    height: 1px;
    background-color: #e3e3e3;
    margin-bottom: 20px;
}
.hospital-rule{
    margin-bottom: 20px;
}
.title {
    font-weight: 500;
    margin-bottom: 10px;
}
.time-info{
    display: flex;
}
.spacing{
    margin-right: 60px;
}
.inner-rule {
    color: #838383;
}
.line-spacing{
    // margin-bottom: 10px;
    line-height: 150%;
}
.departments{
    margin-top: 30px;
}
</style>@/stores/hospital