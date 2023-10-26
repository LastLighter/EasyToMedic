export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface HospitalDetail {
    bookingRule: {
        cycle: number,
        releaseTime: string,
        stopTime: string,
        quitDay: number,
        quitTime :string,
        rule: string[]
    },
    hospital: {
        id: string,
        createTime: string,
        updateTime: string,
        isDeleted: number,
        param: {
            hostypeString: string,
            fullAddress: string,
        },
        hoscode: string,
        hosname: string,
        provinceCode: string,
        cityCode: string,
        districtCode: string,
        address: string,
        logoData :string,
        intro: null,
        route: string,
        status: number,
        bookingRule: null
    }
}

//医院详情接口返回的数据
export interface HospitalDetailRes extends ResponseData{
    data:HospitalDetail
}

//医院科室
export interface Department {
    depcode: string,
    depname: string,
    children?: Department[]
}
//科室接口返回数据类型
export interface DepartmentResData extends ResponseData {
    data: Department[]
}