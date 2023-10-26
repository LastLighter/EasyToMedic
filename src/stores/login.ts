import { ref } from 'vue'
import { defineStore } from 'pinia'
import { reqPhoneCode } from '@/api/common'
import type { UserInfo } from '@/api/common/type'

export const useLoginStore = defineStore('counter', () => {
  const isDialogShow = ref<boolean>(false)
  //当前登录的用户信息
  const userInfo = ref<UserInfo | null>(null)
  //发送验证码的请求
  const getCode = async (phone: string) => {
    let res = await reqPhoneCode(phone)
    return res
  }

  return { isDialogShow, getCode }
})
