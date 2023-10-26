//统一医院详情页模块接口

import request from "@/utils/request";
import type { HospitalDetailRes, DepartmentResData } from "./type";

enum API {
    //根据医院码获取医院信息
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院科室数据
    HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/'
}

export const reqHospitalDetail = (hoscode: string) => {
    return request.get<any,HospitalDetailRes>(API.HOSPITAL_URL + hoscode)
}

export const reqHospitalDepartment = (hoscode: string) => {
    return request.get<any,DepartmentResData>(API.HOSPITAL_DEPARTMENT_URL + hoscode)
}
