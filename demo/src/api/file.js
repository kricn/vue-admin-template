import HTTP from '@/utils/http.js'

export function uploadBigFile (data) {
  return HTTP.request({
    url: '/file/upload',
    method: 'POST',
    data
  })
}