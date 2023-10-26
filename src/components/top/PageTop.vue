<script setup lang="ts">
import router from '../../router';
import { useLoginStore } from '@/stores/login'
import { BlobOptions } from 'buffer';
import { computed, ref } from 'vue'
const store = useLoginStore()

const goHome = () => {
    router.push({ name: 'home' })
}

const showLogin = () => {
    store.isDialogShow = true
}
//获取用户信息
const userInfo = computed(() => store.userInfo)

//svg路径
const basePath = './src/assets/images/common/'

//下拉菜单的显示
const dropDownShowed = ref<boolean>(false)

const handleExpand = () => {
    rotated.value = !rotated.value

    dropDownShowed.value = !dropDownShowed.value
}
//控制拓展按钮是否旋转
const rotated = ref<boolean>(false)
</script>

<template>
    <div class="container">
        <div class="left-entry" @click="goHome">
            <img src="@/assets//images/icon/logo.png" class="logo" />
            <div class="head-text"><span>米哈游 预约挂号统一平台</span></div>
        </div>
        <div class="right-entry">
            <div class="help">
                <a href="#">帮助中心</a>
            </div>
            <div class="user">
                <div class="no-login" v-if="userInfo == undefined">
                    <a href="#" @click="showLogin">登录</a>
                    <span>/</span>
                    <a href="#">注册</a>
                </div>
                <div class="login" v-if="userInfo != undefined">
                    <a href="#">{{ userInfo.name }}</a>
                    <div id="ex-icon" @click="handleExpand" :class="{'rotate-active':rotated}">
                        <img :src="basePath + 'expand.svg'" class="expand-icon" />
                    </div>

                    <ul class="drop-down" v-show="dropDownShowed">
                        <li>实名认证</li>
                        <li>挂号订单</li>
                        <li>就诊人管理</li>
                        <li>退出登录</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    /* padding: 0 10%; */
    background-color: #fff;
    height: 86px;
}

a {
    text-decoration: none;
    color: #838383;
}

a:hover {
    color: #117073;
}

.logo {
    width: 150px;
    margin-right: 30px;
}

.left-entry {
    display: flex;
    align-items: center;
}

.right-entry {
    display: flex;
    align-items: center;
}

.head-text {
    color: transparent;
    background-image: linear-gradient(90deg, #99D9EA, #00A2E8);
    -webkit-background-clip: text;
    font-weight: 600;
    font-size: 24px;
}

.help {
    margin-right: 32px;
    font-weight: 600;
}

.user {
    font-weight: 600;
}

.login {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 140px;

    #ex-icon {
        cursor: pointer;
        // background-color: #117073;
        overflow: hidden;
        transition: all 0.2s ease-in-out;

        .expand-icon {
            transition: width 0.2s ease-in-out;
            width: 16px;
            color: #00A2E8;
        }
    }
    #ex-icon:hover {
        .expand-icon{
            width: 18px;
            position: relative;
            left: -80px;
            filter: drop-shadow(#00A2E8 80px 0);
        }
    }
    .rotate-active{
        transform: rotateZ(-90deg);
    }



    .drop-down {
        top: 25px;
        position: absolute;
        width: 110px;
        background-color: #fcfcfc;
        box-shadow: 2px 2px 5px 1px #ccc;

        li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            padding: 10px 15px;
            color: #666;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
        }

        li:hover {
            background-color: #99D9EA;
        }
    }
}
</style>