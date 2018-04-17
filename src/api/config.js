let NET_TYPE = 0
let URL_HEAD = ''
switch (NET_TYPE) {
  case 0:
    URL_HEAD = '/zrds'
    break
  case 1:
    URL_HEAD = '/dstest'
    break
  default:
    URL_HEAD = '/zrds'
}

export const getVerifyCodeUrl = URL_HEAD + '/controller/platformAdmin/authCode.do?flag=platform'
export const loginPlatformUrl = URL_HEAD + '/user/platLogin'