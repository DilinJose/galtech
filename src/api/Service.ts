import { instance } from "./axios";


export const getData = <T>(url: string) => instance.get<T>(url);
export const postData = <T>(url: string, data: unknown) => instance.post<T>(url, data);
export const putData = <T>(url: string, data: unknown) => instance.put<T>(url, data);
export const deleteData = <T>(url: string) => instance.delete<T>(url);
