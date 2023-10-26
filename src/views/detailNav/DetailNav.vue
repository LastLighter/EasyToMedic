<script setup lang='ts'>
import { ref } from "vue"
import { MenuItem } from "@/api/home/type"
import router from "../../router"
import { useCounterStore } from '@/stores/hospital';

let store = useCounterStore()

const basePath = '/src/assets/images/svg/'

let menuItems = ref<MenuItem[]>([{
    name: '预约挂号',
    router: 'reserve',
    svg: 'reservation.svg'
},
{
    name: '医院详情',
    router: 'baseInfo',
    svg: 'details.svg'
},
{
    name: '预约须知',
    router: 'reserveInfo',
    svg: 'reservationInfo.svg'
},
{
    name: '停诊信息',
    router: 'closureInfo',
    svg: 'closureInfo.svg'
},
{
    name: '查询/取消',
    router: 'search',
    svg: 'search.svg'
}]);

let currentItem = ref<number>(0);
const handleClick = (item :MenuItem,index: number) => {
    currentItem.value = index
    
    router.push({name: item.router, query: {hosCode: store.hosCode}})
}
</script>

<template>
    <div class="container">
            <div class="reservation menu-item" v-for="(item,index) in menuItems" 
            :key="index" @click="handleClick(item,index)" :class="{'active-item': (currentItem == index)}">
                <object :data="basePath + item.svg" class="menu-icon"></object>
                <h2 class="menu-item-text">{{ item.name }}</h2>
            </div>
    </div>
</template>

<style scoped lang="scss">
.menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 60px;
    cursor: pointer;
    margin: 10px 10%;
}

.menu-item:hover {
    background-color: rgba(0, 162, 232, 0.2);
}

.menu-icon {
    margin-right: 10%;
}

.seperator {
    height: 1px;
    background: linear-gradient(to right, transparent, #666, transparent);
}

.active-item {
    color: #00A2E8;
    background-color: #00A2E818;
}
</style>@/stores/hospital