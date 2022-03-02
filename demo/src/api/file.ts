import { ResponseBody } from '@/types'
import HTTP from '@/utils/http'
import { AxiosResponse } from 'axios'

export function uploadBigFile (data: any) {
  return HTTP.request({
    url: '/file/upload',
    method: 'POST',
    data
  })
}

export function mergeBigFile(params: any): Promise<ResponseBody> {
  return HTTP.request({
    url: '/file/merge',
    method: 'GET',
    params
  })
}