<script setup lang="ts">
import HospitalCard from '../hospitalCard/HospitalCard.vue';
import Search from './Search.vue';
import { reqHospitalInfo } from '../../api/home';
import { Content } from '../../api/home/type';
import { ref, onMounted,watch } from 'vue'
import { useRoute } from 'vue-router'

let hospitalArr = ref<Content>([])

const loadData = async (query: string) => {
    //获取数据
    let res = await reqHospitalInfo(query)

    hospitalArr.value = res.data.data
    console.log(hospitalArr);
    console.log('do it');
}
const route = useRoute()
const keyword = ref<string>(route.query.keyword)

//监听参数变化，因为默认不监听不会重新获取数据
watch(() => route.query, () => {
    keyword.value = route.query.keyword
    loadData(keyword.value)
})
onMounted(() => {
    loadData(keyword.value)
})
</script>

<template>
    <div class="contain">
        <div class="search-box">
            <Search :fill="keyword"></Search>
        </div>
        <div class="seperator"></div>
        <div class="content">
            <div class="hospital-cards" v-for="(item, index) in hospitalArr" :key="item.id">
                <HospitalCard :hospitalInfo="item"></HospitalCard>
            </div>
        </div>
    </div>
</template>

<style scoped>
.contain{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.content{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.hospital-cards{
    flex-basis: 42%;
    /* flex-grow: 1; */
    margin: 10px 25px;
    /* min-width: 600px; */
}
.search-box{
    margin-bottom: 40px;
}
.seperator{
    height: 1px;
    width: 100%;
    background-color: #e3e3e3;
    margin-bottom: 40px;
    box-shadow: 0 0 5px 0px #eee;
}
</style>