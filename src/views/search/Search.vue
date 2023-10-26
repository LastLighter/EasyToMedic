<script setup lang="ts">
import { ref } from "vue"
import { reqHospitalInfo } from "../../api/home";
import { Content, HospitalInfo,SuggestItem } from "../../api/home/type";
import router from "../../router";

const content = ref<string>('')
const suggest = ref<Content>()

//input发生改变
const handleChange = async (query: string, callback) => {
    //获取数据
    let res = await reqHospitalInfo(query)
    
    suggest.value = res.data.data
    console.log(suggest.value)
    let arr: SuggestItem[] = []
    for(const index in suggest.value){
        let item = {value: suggest.value[index].hosname, link: suggest.value[index].param.hostypeString}
        arr.push(item)
    }
    console.log(arr);
    
    callback(arr)
}
const props = defineProps(['fill'])
content.value = props.fill? props.fill: ''

const handleSelect = (item: SuggestItem) => {
    console.log(item);
    router.push({name:'about'})
}

const handleSearch = (keyword: string) => {
    router.push({name: 'hosSearch', query: {'keyword': keyword}})
}
const handleEnter = () => {
    handleSearch(content.value)
}
</script>

<template>
    <div class="complete" @keyup.enter="handleEnter">
        <el-autocomplete v-model="content" placeholder="请输入医院名称" 
        :fetch-suggestions="handleChange"
        :trigger-on-focus="false"
        @select="handleSelect">
        </el-autocomplete>
        <button @click="handleSearch(content)">
            <el-icon class="el-input__icon icon" size="25">
                <Search />
            </el-icon>
            <span>搜索</span>
        </button>
    </div>
</template>

<style scoped>
.complete {
    display: flex;
    align-items: center;
}

:deep(.el-input__wrapper) {
    width: 600px;
    height: 45px;
    font-size: 1.2rem;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
}

button {
    background-color: #00A2E8;
    border: none;
    height: 47px;
    width: 100px;
    color: #EDEDED;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
}
.icon{
    margin-right: 15px;
}
</style>
