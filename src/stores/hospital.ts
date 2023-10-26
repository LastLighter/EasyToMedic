import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { HospitalDetail} from '@/api/hospital/type'

export const useCounterStore = defineStore('counter', () => {
  const hosDetail = ref<HospitalDetail | null>()
  const hosCode = ref<string>('')
  

  return { hosDetail,hosCode }
})
