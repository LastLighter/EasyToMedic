export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

export interface LoginData {
    phone: string,
    code: string
}

export interface UserInfo {
    name: string,
    token: string
}

export interface UserLoginResData extends ResponseData {
    data: UserInfo
}