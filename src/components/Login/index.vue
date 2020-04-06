<template>
  <div class="login-container">
    <div class="desc-container">
      <!-- <div class="login-top">
        CWStage
      </div> -->
      <div class="desc-title">CWStage 创作台</div>
    </div>
    
    <div class="login-form">
       <a-tabs v-model="activeKey" @change="onTabChange" >
          <a-tab-pane tab="登录" key="login">
            <a-input class="form-item-margin" v-model="loginForm.name" placeholder="请输入用户名" />
            <a-input-password class="form-item-margin" v-model="loginForm.password" placeholder="请输入密码" />
            <a-button class="save-button" @click="onLogin" type="primary" block :disabled="disabled">登录</a-button>
          </a-tab-pane>
          <a-tab-pane tab="注册" key="register">
            <a-input class="form-item-margin" v-model="registerForm.name" placeholder="请输入用户名" />
            <a-input-password class="form-item-margin" v-model="registerForm.password" placeholder="请输入密码" />
            <a-input-password class="form-item-margin" v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
            <a-button class="save-button" @click="onRegister" type="primary" block :disabled="registerDisabled">注册</a-button>
          </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
.login-container {
  width: 100%;
  height: 100vh;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-position: 300% 300%;
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}
.login-top {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  color: #666;
}
.desc-container {
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.6);
  width: 100%;
  height: 320px;
  color: #333;
}
.desc-title {
  margin-top: 72px;
  line-height: 64px;
  text-align: center;
  font-weight: 400;
  font-size: 48px;
  color: #6e4bc2;
  text-shadow: 1px 1px 2px #6e4bc2;
}
.form-item-margin {
  margin-bottom: 12px;
}
.login-form {
  border-radius: 8px;
  width: 420px;
  position: absolute;
  left: 50%;
  top: 240px;
  transform: translateX(-50%);
  padding: 36px 24px;
  background: rgba(255, 255, 255, 1);
}
.other-button {
  color: #6e4bc2;
  text-align: center;
}
.save-button {
  margin-top: 16px;
}
.save-button[disabled=disabled] {
  color: #fff;
  background: #6e4bc2;
  position: relative;
  border: none;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
  }
  &:hover {
    color: #fff;
    background: #6e4bc2;
  }
}
.huo {
  text-align: center;
  color: #6e4bc2;
  margin: 12px 0;
}
</style>

<script>
const PATTEAN_NAME = /^[\u4e00-\u9fa5\w]{2,10}$/
const PATTEAN_PASSWORD = /^\w{6,12}$/
export default {
  data: () => ({
    activeKey: 'login',
    loginForm: {
      name: '',
      password: ''
    },
    registerForm: {
      name: '',
      password: '',
      confirmPassword: ''
    },
  }),
  computed: {
    disabled() {
      return !this.loginForm.name || !this.loginForm.password;
    },
    registerDisabled() {
      return !this.registerForm.name || !this.registerForm.password || !this.registerForm.confirmPassword;
    }
  },
  methods: {
    onTabChange(tab) {
      this.activeKey = tab;
    },
    onRegister() {
      const {name, password, confirmPassword} = this.registerForm;
      if (!PATTEAN_NAME.test(name)) {
        return this.$notification.warn({message: '用户名格式错误'})
      }
      if (!PATTEAN_PASSWORD.test(password)) {
        return this.$notification.warn({message: '密码格式错误'})
      }
      if (password !== confirmPassword) {
        return this.$notification.warn({message: '两次密码输入不一致'})
      }
      this.$post('/auth/register', this.registerForm).then(() => {
        this.activeKey = 'login';
      })
    },
    onLogin() {
      this.$post('/auth/login', this.loginForm).then(res => {
        this.$store.dispatch('login', {
          token: res.data.token,
          userInfo: res.data.userInfo,
          success: () => {
            this.$router.replace('/')
          }
        })
      })
    }
  }
}
</script>