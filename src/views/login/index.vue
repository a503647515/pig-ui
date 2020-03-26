<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-info text-white animated fadeInLeft">
      <h2 class="login-info-title">{{website.info.title}}</h2>
      <ul class="login-info-list">
        <li class="login-info-item" v-for="(item,index) in website.info.list" :key="index">
          <i class="el-icon-check"></i>&nbsp;{{item}}
        </li>
      </ul>
    </div>
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
        <h1 class="login-title c7 f26 fb l3">思洋催债系统</h1>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <codeLogin></codeLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userlogin'
import codeLogin from './codelogin'
export default {
  name: 'login',
  components: {
    userLogin,
    codeLogin,
  },
  data() {
    return {
      activeName: 'user',
      website: {
        title: '思洋催债系统',
        logo: '思洋',
        author: '思洋',
        whiteList: ['/login', '/404', '/401', '/lock'],
        info: {
          title: '湖南思洋互联网产业发展有限公司',
          list: [

            ' 湖南思洋互联网产业发展有限公司， 是一家集互联网技术应用、普惠金融、 投融资服务于一体的多元化现代服务业集团。',
            '已为湖南30000 多家大中小企业提供数字化一站式全链路解决方案，为全球数字经济发展贡献力量!',
            '为大中小型企业提供数字化一站式全链路解决方案'

          ]
        },
        wel: {
          title: '湖南思洋互联网产业发展有限公司',
          list: [
            ' 湖南思洋互联网产业发展有限公司， 是一家集互联网技术应用、普惠金融、 投融资服务于一体的多元化现代服务业集团。',
            '已为湖南30000 多家大中小企业提供数字化一站式全链路解决方案，为全球数字经济发展贡献力量!',
            '为大中小型企业提供数字化一站式全链路解决方案'
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login.png");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 40px 25px 40px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  /*color: #409eff;*/
  letter-spacing: 3px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  background: #3080fe;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>
