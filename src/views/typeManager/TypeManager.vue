<script setup lang="ts">
import type { HospitalLevelAndRegionResponseData } from '@/api/home/type'
import { reqHospitalLevelAndRegion } from '@/api/home/index'
import { reactive,onMounted,ref,toRefs } from 'vue'
import { TypeInfo } from '../../api/home/type';

let resLevelData = ref<HospitalLevelAndRegionResponseData>({})
let resRegionData = ref<HospitalLevelAndRegionResponseData>({})
let levelActive = ref<string>('');
let regionActive = ref<string>('');
//load类型和地区数据
const loadData = async() => {
    let res = await reqHospitalLevelAndRegion('hosType')
    resLevelData.value = res

    res = await reqHospitalLevelAndRegion('Beijin')
    resRegionData.value = res
}
//声明自定义事件
let emit = defineEmits<{(getTypeInfo: 'getTypeInfo',typeInfo: TypeInfo): void}>()

//更改等级高亮状态
const changeLevel = (level: string) => {
    levelActive.value = level
    emit('getTypeInfo',{ level: levelActive.value, region: regionActive.value })
}
//更改地区高亮状态
const changeRegion = (region: string) => {
    regionActive.value = region
    emit('getTypeInfo',{ level: levelActive.value, region: regionActive.value })  
}
onMounted(() => {
    loadData()
})

</script>

<template>
    <div class="header">
        <h1 class="header">医院</h1>
    </div>
    <div class="separator">

    </div>
    <div class="level">
        <h2>等级:</h2>
        <ul class="level-items">
            <li class="level-item all-select-level" 
            :class="{ 'active-item':levelActive == '' }"
            @click="changeLevel('')">全部</li>
            <li class="level-item" v-for="(item,index) in resLevelData.data" 
            :key="index"
            :class="{ 'active-item':levelActive == item.value }"
            @click="changeLevel(item.value)"> {{ item.name }} </li>
        </ul>
    </div>
    <div class="region">
        <h2>地区:</h2>
        <ul class="region-items">
            <li class="region-item all-select-region"
            :class="{ 'active-item':regionActive == '' }"
            @click="changeRegion('')">全部</li>
            <li class="level-item" v-for="(item,index) in resRegionData.data" 
            :key="index"
            :class="{ 'active-item':regionActive == item.value }"
            @click="changeRegion(item.value)"> {{ item.name }} </li>
        </ul>
    </div>
</template>

<style scoped>
.header{
font-size: 20px;
font-weight: 600;
}
.separator{
    height: 1px;
    background-color: #7F7F7F;
    margin-bottom: 30px;
    margin-right: 10%;
    box-shadow: 0px 1px 5px 1px #e3e3e3;
}
h1,h2 {
    color: #424242;
}
h2{
    margin-bottom:0.6rem;
}
li{
    display: inline-block;
    list-style: none;
    margin-right: 1.5rem;
    color: #7F7F7F;
}
.header,.level,.region{
    margin-bottom: 1rem;
}
.level-item:hover,.region-item:hover {
    color: #F2BF0D;
    text-shadow: 6px 4px 12px #B8B8B8;
    cursor: pointer;
}
.level-item, .region-item{
    margin: 12px 25px;
    transition: all 0.3s ease-in;
}
.active-item{
    color: #F2BF0D;
    text-shadow: 6px 4px 6px #B8B8B8;
}
</style>