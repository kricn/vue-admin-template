import request from '@/utils/request'

export function uploadBigFile (data: any) {
  return request("POST", "/file/upload", data);
}

export function mergeBigFile(params: any) {
  return request("GET", "/file/merge", params)
}