<script setup lang="ts">
import type { Department } from '@/api/hospital/type'
import { ref } from 'vue';
const rightItem = ref([])

let props = defineProps<{
    itemArr: Department[]
}>()

//当前选中的大标题
const currentIndex = ref(0)

//点击跳转
let handleClick = (index: number) => {
    currentIndex.value = index
    rightItem.value[index].scrollIntoView({ behavior: "smooth", block: "start" })
}

</script>

<template>
    <div id="root">
        <ul class="left-list">
            <li v-for="(item, index) in itemArr" :key="item.depcode" :class="{ active: currentIndex == index }">
                <a class="left-item-text" @click="handleClick(index)">{{ item.depname }}</a>
            </li>
        </ul>
        <div class="seperator"></div>
        <ul class="right-list">
            <li class="list-item" v-for="item in itemArr" :key="item.depcode" ref="rightItem">
                <div class="right-item-title">{{ item.depname }}</div>
                <ul class="children">
                    <li class="children-name" v-for="child in item.children" :key="child.depname">{{ child.depname
                    }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
#root {
    display: flex;
    height: 60vh;
    border:3px solid #e3e3e3;
    box-shadow: 2px 2px 8px 0px #ccc;
    .left-list {
        min-width: 12%;
        display: flex;
        flex-direction: column;

        li {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #EBE8CC;
            border-top: 1px solid #ccc;

            .left-item-text {
                color: #333;
                font-weight: 500;
                cursor: pointer;
                text-decoration: none;
            }

            .left-item-text:hover {
                color: #fff;
            }
        }

        .active {
            border-right: 4px solid #fff;
            background-color: #E0DDC3;
        }
    }

    .seperator {
        min-width: 5px;
        background-color: #e3e3e3;
    }

    .right-list {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar{
            display: none;
        }

        .list-item {
            padding: 20px 15px;
            background-color: #E6CFD6;

            .right-item-title {
                font-weight: 600;
                font-size: 20px;
                margin-bottom: 15px;
                background-color: #DBC5CD;
            }

            .children {
                display: flex;
                flex-wrap: wrap;

                .children-name {
                    margin: 0px 40px 15px 0px;
                    cursor: pointer;
                    color: #555;
                }

                .children-name:hover {
                    color: #111;
                }
            }
        }
    }
}
</style>