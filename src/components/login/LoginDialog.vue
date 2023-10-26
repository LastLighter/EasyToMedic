<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLoginStore } from '@/stores/login'
import { count } from 'console';
import { userLogin } from '@/api/common/index';
import { LoginData } from '@/api/common/type';
import { UserInfo, UserLoginResData } from '../../api/common/type';

let store = useLoginStore()
let isShowed = computed<boolean>(() => store.isDialogShow)

const basePath = '/src/assets/images/login/'
const codeBasePath = '/src/assets/images/'
const iconName = ['user.svg', 'verification.svg', 'wechat.svg', 'phone.svg']
const codeIconName = ['code_app.png', 'code_login_wechat.png']

//控制两种登陆方式的显示与隐藏
let loginMethod = ref<number>(0)

const handleClose = () => {
    store.isDialogShow = false
}
//切换登陆方式
const handleChangeLogin = (method: number) => {
    loginMethod.value = method
}
//是否为正确的手机号正则
const telReg = /^1[3-9]\d{9}$/

//输入的手机号
let phone = ref<string>('')
let code = ref<string>('')

//手机号合法
let isTruePhone = computed(() => telReg.test(phone.value))
//按钮是否可用
let enable = ref<boolean>(false)
watch(phone,() => {
    if(telReg.test(phone.value)){
        enable.value = true
    }
})

//点击获取验证码
const handleGetCode = async () => {
    try {
        let res = await store.getCode(phone.value)
        code.value = res.data
    } catch {
        ElMessage({
            type: 'error',
            message: '验证码发送失败'
        })
    }
    //禁止点击
    enable.value = false
    //设置倒计时
    countDown.value = 60
    const countInterval = setInterval(() => {
        countDown.value--;     
        if(countDown.value <= 0){
            clearInterval(countInterval)
            enable.value = true
        }
    },1000)
}

//验证码倒计时
let countDown = ref<number>(0)

//登录
const login = async () => {
    let data:LoginData = {
        'phone':phone.value,
        'code':code.value
    }
    let res: UserLoginResData = await userLogin(data)
    //异常处理
    if(res == null || res.code != 200){
        ElMessage({
            type: 'error',
            message: '登录失败，请检查验证码'
        })
    }else{
    //存储用户信息
    store.userInfo = res.data
    //关闭登录窗口
    store.isDialogShow = false
    }
}
</script>

<template>
    <div class=mask v-show="isShowed">
        <div class="container">
            <div class="header">
                <div class="title">
                    <h1>用户登录</h1>
                </div>
                <svg t="1697956196711" class="close-icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4015" width="21" height="21" @click="handleClose">
                    <path
                        d="M570.514286 512l292.571428-292.571429c14.628571-14.628571 14.628571-43.885714 0-58.514285-14.628571-14.628571-43.885714-14.628571-58.514285 0l-292.571429 292.571428-292.571429-292.571428c-14.628571-14.628571-43.885714-14.628571-58.514285 0-21.942857 14.628571-21.942857 43.885714 0 58.514285l292.571428 292.571429-292.571428 292.571429c-14.628571 14.628571-14.628571 43.885714 0 58.514285 14.628571 14.628571 43.885714 14.628571 58.514285 0l292.571429-292.571428 292.571429 292.571428c14.628571 14.628571 43.885714 14.628571 58.514285 0 14.628571-14.628571 14.628571-43.885714 0-58.514285l-292.571428-292.571429z">
                    </path>
                </svg>
            </div>
            <div class="seperator"></div>
            <div class=content>
                <div class="left-item">
                    <div class="admin-login" v-show="loginMethod == 0">
                        <div class="phone">
                            <object :data="basePath + iconName[0]" class="input-icon"></object>
                            <input placeholder="请输入手机号" class="phone-input" v-model="phone" />
                        </div>
                        <div class="tip" v-show="!isTruePhone && phone.length > 0">
                            <span>请输入正确的手机号</span>
                        </div>
                        <div class="verification">
                            <object :data="basePath + iconName[1]" class="input-icon"></object>
                            <input placeholder="请输入验证码" class="code-input" v-model="code" />
                            <button class="get-code" :disabled="!enable" @click="handleGetCode">
                                <span>获取验证码</span>
                                <span v-if="countDown > 0">({{ countDown }}s)</span>
                            </button>
                        </div>
                        <div class="login-entry">
                            <button class="login" :disabled="code == undefined ? true : !(isTruePhone && code.length > 0)" @click="login" >登录</button>
                            <div class="weixin" @click="handleChangeLogin(1)">
                                <img :src="basePath + iconName[2]" class="wechat-icon" />
                                <span>使用微信扫码登陆</span>
                            </div>
                        </div>
                    </div>
                    <div class="weixin-login" v-show="loginMethod == 1">
                        <div class="header">
                            <h1>微信登录</h1>
                        </div>
                        <div class="qr-code">
                            <img :src="codeBasePath + codeIconName[1]" />
                        </div>
                        <div class="description">
                            <span>使用微信扫一扫登录</span>
                            <span>“尚硅谷”</span>
                        </div>
                        <div class="switch-login" @click="handleChangeLogin(0)">
                            <div class="phone-icon">
                                <img :src="basePath + iconName[3]" class="icon" />
                            </div>
                            <span>手机短信验证码登录</span>
                        </div>
                    </div>
                </div>
                <div class="right-item">
                    <div class="top-entry">
                        <div class="part">
                            <img :src="codeBasePath + codeIconName[1]" class="qr-code" />
                            <div class="description">
                                <img :src="basePath + iconName[2]" class="icon" />
                                <div>微信扫一扫关注</div>
                                <div>快速预约挂号</div>
                            </div>
                        </div>
                        <div class="part">
                            <img :src="codeBasePath + codeIconName[0]" class="qr-code" />
                            <div class="description">
                                <img :src="basePath + iconName[3]" class="icon" />
                                <div>扫一扫下载</div>
                                <div>预约挂号APP</div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-entry">
                        <h1>米哈游官方指定平台</h1>
                        <h1>快速挂号，安全放心！</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mask {
    height: 100vh;
    width: 100%;
    background-color: #00000066;
    position: fixed;
    z-index: 999;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        min-width: 20vw;
        min-height: 20vh;
        background-color: #f6f6f6;
        padding: 25px 35px;

        .header {
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 520;
            color: #333;

            .close-icon {
                float: right;
                cursor: pointer;
                fill: #838383;
            }

            .close-icon:hover path {
                fill: #A4D0EB;
            }
        }

        .seperator {
            width: 100%;
            margin: 20px 0px;
            height: 1px;
            background-color: #d0d0d0;
        }

        .content {
            width: fit-content;
            display: flex;
            justify-content: space-between;

            .left-item {
                border: 1px solid #e3e3e3;
                border-radius: 10px;
                padding: 25px 20px;
                margin-right: 40px;

                .admin-login {
                    input {
                        border-radius: 10px;
                        padding: 2px 12px;
                        background-color: #EBEBEB;
                        height: 38px;
                        font-size: 16px;
                        appearance: none;
                        border: 1px solid #b3b3b3;
                    }

                    input:focus {
                        outline: none;
                        border: 1px solid #6F6A8A;
                    }

                    .input-icon {
                        height: 20px;
                        margin-right: 21px;
                    }

                    .phone {
                        display: flex;
                        align-items: center;
                        margin: 5px 10px;
                        margin-top: 20px;

                        .phone-input {
                            width: 270px;
                        }
                    }

                    .tip{
                        padding-left: 55px;
                        font-size: 14px;
                        color: #ED1C24;
                        min-height: 16px;
                    }

                    .verification {
                        display: flex;
                        align-items: center;
                        margin: 35px 10px;

                        .code-input {
                            width: 100px;
                            margin-right: 34px;
                        }

                        .get-code {
                            // cursor: pointer;
                            width: 130px;
                            height: 38px;
                            font-size: 13px;
                            border-radius: 3px;
                            border: 1px solid #b3b3b3;
                        }

                        .get-code:hover {
                            background-color: #e3e3e3;
                        }
                    }

                    .login-entry {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .login {
                            color: #e3e3e3;
                            font-weight: 520;
                            width: 260px;
                            height: 40px;
                            font-size: 15px;
                            margin-top: 10px;
                            margin-bottom: 15px;
                            letter-spacing: 10px;
                            background-color: #83B9E6;
                            cursor: pointer;
                            border: none;
                            border-radius: 6px;
                        }

                        .login:hover {
                            background-color: #8ACAE6;
                        }

                        .weixin {
                            font-size: 16px;
                            color: #888;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;

                            .wechat-icon {
                                margin-right: 15px;
                                width: 20px;
                            }
                        }

                        .weixin:hover {
                            color: #6F6A8A;
                        }
                    }
                }

                .weixin-login {
                    .header {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 20px;
                    }

                    .qr-code {
                        display: flex;
                        justify-content: center;
                        border: 1px solid #e3e3e3;
                        border-radius: 10px;
                        padding: 20px 20px;
                        margin-bottom: 20px;

                        img {
                            width: 210px;
                        }
                    }

                    .description {
                        color: #888;
                        font-size: 15px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 20px;
                    }

                    .switch-login {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #666;
                        cursor: pointer;

                        .phone-icon {
                            border-radius: 50%;
                            width: 30px;
                            height: 30px;
                            background-color: #2EF297;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 15px;

                            img {
                                width: 16px;
                            }
                        }

                        span:hover {
                            color: #111;
                        }
                    }
                }

            }

            .right-item {
                .top-entry {
                    display: flex;
                    margin-bottom: 20px;

                    .description {
                        display: flex;
                        flex-direction: column;
                        align-items: center;


                        .wechat-icon {
                            width: 20px;
                        }
                    }

                    .part {
                        margin-right: 40px;

                        .description {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            color: #888;
                        }

                        .qr-code {
                            width: 120px;
                            margin-bottom: 10px;
                        }

                        .icon {
                            width: 20px;
                            margin-bottom: 10px;
                        }
                    }

                }

                .bottom-entry {
                    font-weight: 520;
                    font-size: 24px;
                }
            }
        }

    }
}</style>