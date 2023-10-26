import request from "@/utils/request";
import type { LoginData, UserInfo } from "./type";

enum API {
    //短信验证码接口
    GETPHONECODE_URL = '/sms/send/',
    USERLOGIN_URL = '/user/login',
}

const reqPhoneCode = (phone: string) => {
    return request.get<any,any>(API.GETPHONECODE_URL + phone)
}

const userLogin = (data: LoginData) => {
    return request.post<any,UserInfo>(API.USERLOGIN_URL,data)
}

export { reqPhoneCode, userLogin }