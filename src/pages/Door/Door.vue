<template>
  <div class="door">
    <div class="center-decoration">
      <div class="door-title">
        <span>QQSignBotAdmin</span>
      </div>
      <div class="door-info">
        <span>请先登录</span>
      </div>
    </div>
    <div class="door-login">
      <form>
        <div class="input-block">
          <input class="login-input" placeholder="用户名" @input="usernameErrorTip = ''" v-model="username" />
          <span class="login-tip">{{ usernameErrorTip }}</span>
        </div>
        <div>
          <input class="login-input" placeholder="密码" type="password" @input="passwordErrorTip = ''" v-model="password" />
          <span class="login-tip">{{ passwordErrorTip }}</span>
        </div>
        <button type="submit" class="login-button" @click.prevent="login">登 录</button>
      </form>
    </div>
    <!-- 波浪 -->
    <div class="door-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,224L40,229.3C80,235,160,245,240,224C320,203,400,149,480,154.7C560,160,640,224,720,229.3C800,235,880,181,960,138.7C1040,96,1120,64,1200,85.3C1280,107,1360,181,1400,218.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

export default defineComponent({
  setup() {
    // Vue-Router
    const router = useRouter()
    /**
     * =========表单验证与登录=========
     */
    // 用户名长度的最大值(不包括该值)
    const USERNAME_MAX_LENGTH = 20
    // 用户长度的最小值(包括该值)
    const USERNAME_MIN_LENGTH = 10
    // 密码长度最大值(不包括该值)
    const PASSWORD_MAX_LENGTH = 30
    // 密码长度的最小值(包括该值)
    const PASSWORD_MIN_LENGTH = 6
    // 用户有误时的提示信息
    const usernameErrorTip = ref<string>()
    // 密码有误时的提示信息
    const passwordErrorTip = ref<string>()
    // 用户名
    const username = ref<string>('')
    // 密码
    const password = ref<string>('')
    /**
     * 验证表单
     * @return 若返回true表示表单可用,false表示不可用
     */
    const checkForm = (): boolean => {
      let isValid = true
      // 验证用户名
      const uLength = username.value?.length
      if (uLength == 0) {
        usernameErrorTip.value = '用户名不能为空!'
        isValid = false
      } else if (uLength >= USERNAME_MAX_LENGTH) {
        usernameErrorTip.value = '用户名太长!请检查后重新输入'
        isValid = false
      } else if (uLength < USERNAME_MIN_LENGTH) {
        usernameErrorTip.value = `用户名太短!至少为${USERNAME_MIN_LENGTH}位`
        isValid = false
      }
      // 验证密码
      const pLength = password.value.length
      if (pLength == 0) {
        passwordErrorTip.value = '密码不能为空!'
        isValid = false
      } else if (pLength < PASSWORD_MIN_LENGTH) {
        passwordErrorTip.value = `密码太短!至少为${PASSWORD_MIN_LENGTH}位`
        isValid = false
      } else if (pLength >= PASSWORD_MAX_LENGTH) {
        passwordErrorTip.value = '输入的密码太长!请检查后重新输入'
        isValid = false
      }
      return isValid
    }
    // 登录
    const login = () => {
      if (checkForm()) {
        // TODO do login here
        const loading = ElLoading.service({
          body: true
        })
        setTimeout(() => {
          loading.close()
          router.replace('/')
        }, 2000)
      }
    }
    return {
      usernameErrorTip,
      passwordErrorTip,
      login,
      username,
      password
    }
  }
})
</script>

<style lang="scss">
.login-tip {
  font-size: 14px;
  margin-left: 20px;
  margin-top: 5px;
  float: left;
  color: $color-danger;
}
.input-block {
  margin: 40px 0;
}
.login-button {
  display: block;
  width: 231px;
  height: 50px;
  font-size: 22px;
  border-radius: 25px;
  margin-top: 50px;
  opacity: 0.9;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  background-color: #4b75f6;
  color: white;
  border: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: $color-main;
  }
}
.login-input {
  display: block;
  width: 485px;
  height: 60px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #f7f4fa;
  border-radius: 30px;
  @include input-style;
}
.door-login {
  margin-top: 50px;
  z-index: 1;
}
.center-decoration {
  margin-top: 80px;
  text-align: center;
}
.door-info {
  margin-top: 40px;
  font-size: 25px;
  color: $color-info;
  &:before {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 10px;
    width: 70px;
    content: '';
    border-top: $color-main 5px solid;
  }
}
.door-title {
  font-size: 40px;
  padding-top: 20px;
  color: $text-primary;
}
.door {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-left: 0;
  margin-top: 0;
  background-color: white;
}
.door-wave {
  position: fixed;
  @include scale-method;
  bottom: -4px;
  z-index: 0;
}
</style>
