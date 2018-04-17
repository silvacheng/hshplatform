<template>
  <div class="login-wrapper">
    <div class="header-wrapper">
      <h2>中燃慧生活</h2><span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;登录</span>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <div class="item">
          <span>账号</span>          
          <el-input
            placeholder="请输入账号"
            v-model="account"
            clearable>
          </el-input>
        </div>
        <div class="item">
          <span>密码</span>
          <el-input
            placeholder="请输入密码"
            v-model="password"
            type="password"
            clearable>
          </el-input>
        </div>
        <div class="item">
          <span>验证码</span>
          <el-input
            placeholder="请输入验证码"
            v-model="verifycode"
            class="verify-code"
            maxlength="4"
            clearable>
          </el-input>
          <img :src="verifyImageUrl" alt="" class="verifyImage" width="120" @click.stop="getAuthCode" height="26">
        </div>
        <div class="item">
          <el-button type="primary" @click.stop="login">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <p>Copyright© zrhsh.cn All Rights Reserved</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getVerifyCodeUrl, loginPlatformUrl } from '@/api/config.js'
import { _post } from '@/common/js/fetch.js'
import md5 from 'md5'
export default {
  data () {
    return {
      account: '',
      password: '',
      verifycode: '',
      verifyImageUrl: '',
      submitFlag: false     
    }
  },
  created () {
    this.getAuthCode()
    document.onkeyup = (e) => {
      if (e.keyCode && e.keyCode === 13) {
        this.login()
      }
    }        
  },
  methods: {
    getAuthCode () { // 获取图形验证码
      this.verifycode = ''
      this.verifyImageUrl = getVerifyCodeUrl + Math.random()
    },
    login () {
      if (this.submitFlag) {
        return
      } 
      let data = this._getRequestData()
      this.submitFlag = true      
      _post(loginPlatformUrl, data).then((res) => {
        this.submitFlag = false
        // console.log(res)
        if (res.status === 1) {
          window.sessionStorage.setItem('userMobile', res.data.mobile)
          window.sessionStorage.setItem('allCodes', res.data.allCodes)
          window.sessionStorage.setItem('codes', res.data.codes)
          window.sessionStorage.setItem('avatar', res.data.picdir)
          this.$router.push('/layout')
        } else {
          this.$message(res.message)
        }
      }).catch((err) => {
        this.submitFlag = false        
        this.$message(err)
      })
    },
    _getRequestData () {
      if (!this.account || !this.password) {
        alert('请输入账号或密码')
        return
      }
      if (!this.verifycode) {
        alert('请输入验证码')
        return
      }
      let CC = this.account.trim()
      let DD = md5(this.password.trim())
      let codeKeyValue = this.verifycode.trim()
      let codeKey = this.verifyImageUrl.split('=')[1]
      let ajaxData = {
        CC: CC,
        DD: DD,
        codeKeyValue: codeKeyValue,
        codeKey: codeKey
      }
      return ajaxData  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
  .login-wrapper {
    margin: 0 100px;
    height: 100%;
    min-width: 400px;
    position: relative;
    overflow: hidden;
    .header-wrapper {
      height: 60px;
      line-height: 26px;
      font-size: 20px;
      border-bottom: 3px solid #000;
      h2 {
        padding-left: 30px;
        display: inline-block;
      }
    }
    .content-wrapper {
      position: relative;
      width:100%;
      height: 100%;
      .content {
        position: absolute;
        left:50%;
        top:35%;
        margin-left: -180px;
        box-sizing: border-box;
        .item {
          width:360px;
          margin-bottom: 10px;
          span {
            width: 48px;
            font-size: 16px;
            display: inline-block;
            margin-right: 10px;
          }
          .verifyImage {
            margin-left: 15px;
          }
          .el-input {
            width: 80%;
            &.verify-code{
              width: 40%;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
          .el-button {
            width: 100%;
          }
        }
      }
    }
    .footer-wrapper {
      text-align: center;
      height: 36px;
      line-height: 16px;
      border: 1px solid #9d9d9d;
      border-bottom: none;
      position: absolute;
      bottom: 10px;
      width:96%;
      p {
        font-size: 14px;
        color: #9d9d9d
      }
    }
  }
</style>
