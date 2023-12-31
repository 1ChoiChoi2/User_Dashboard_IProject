import { UploadFile } from "antd";

export interface User {
    key: number,
    name: string,
    email: string,
    phone?: string,
    gender: string,
    avatar: UploadFile[],
}