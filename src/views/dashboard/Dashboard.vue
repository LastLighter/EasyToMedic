<script setup lang="ts">
import BulletinBoard from '../bulletinBoard/BulletinBoard.vue'
import TypManager from '../typeManager/TypeManager.vue'
import HospitalCard from '../hospitalCard/HospitalCard.vue'
import { ref, onMounted } from 'vue';
import { reqHospital } from '../../api/home';
import { Content,HospitalResponseData,TypeInfo } from '@/api/home/type'

let pageSize = ref<number>(10)
let totalSize = ref<number>(20)
let curPage = ref<number>(1)
let hospitalArr = ref<Content>([])
onMounted(() => {
    getHospitalInfo()
})

async function getHospitalInfo(hosType?: string, districtCode?: string) {
    let res: HospitalResponseData = await reqHospital(curPage.value, pageSize.value, hosType, districtCode)
    loadCards(res)
}

//load卡片数据
const loadCards = (res: HospitalResponseData) => {
    hospitalArr.value = res.data.content
    totalSize.value = res.data.totalElements
}

//切换分页
const changeCurreent = (val: number) => {
    curPage.value = val
    getHospitalInfo()
}

//获取子组件的type信息
const getTypeInfo = (typeInfo: TypeInfo) => {
    getHospitalInfo(typeInfo.level, typeInfo.region)
}
</script>

<template>
    <div class="container">
        <div class="left-entry">
            <div class="type-manager">
                <TypManager @getTypeInfo="getTypeInfo"></TypManager>
            </div>
            <div class="cards-container">
                <div class="hospital-cards" v-for="(item, index) in hospitalArr" :key="item.id">
                    <HospitalCard :hospitalInfo="item"></HospitalCard>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" v-model:current-page="curPage" :total="totalSize"
                    @current-change="changeCurreent" :page-size="pageSize" />
            </div>
        </div>
        <div class="right-entry">
            <div class="bulletin-board">
                <BulletinBoard></BulletinBoard>
            </div>
        </div>

    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
}

.left-entry {
    min-width: 60%;
    max-width: 1140px;
    margin-right: 40px;
}
.right-entry{
    min-width: 16%;
}

.type-manager {}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}

.hospital-cards {
    width: 45%;
    margin: 15px 10px;
}
</style>