//统一管理首页模块接口

import request from "@/utils/request";
import { Content, type HospitalInfo, type HospitalLevelAndRegionArr } from "./type";

enum API {
    //已有的医院接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院等级或者地区接口
    HOSPITALLEVELANDREGION_URL = '/cmn/dict/findByDictCode/',
    //按名称搜索医院
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}

const reqHospital = (page: number, limit: number, hostype='', districtCode='') => {
    return request.get<any, Content>(API.HOSPITAL_URL + `${page}/${limit}` + `?hostype=${hostype}&districtCode=${districtCode}`)
}
const reqHospitalLevelAndRegion = (dictCode: string) => {
    return request.get<any, HospitalLevelAndRegionArr>(API.HOSPITALLEVELANDREGION_URL + `${dictCode}`)
}
const reqHospitalInfo = (name: string) => {
    return request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + `${name}`)
}

export { reqHospital,reqHospitalLevelAndRegion,reqHospitalInfo }