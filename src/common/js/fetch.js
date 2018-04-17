import axios from 'axios'

function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? '?' + url.substring(1) : ''
}

export function _post (url, obj) {
  let URL = url + param(obj)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      timeout: 100000,
      url: URL
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}