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
        <input class="login-input" placeholder="用户名" />
        <input class="login-input" placeholder="密码" type="password" />
        <button type="submit" class="login-button">登 录</button>
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
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      data: true
    }
  }
})
</script>

<style lang="scss">
.login-button {
  display: block;
  width: 231px;
  height: 50px;
  font-size: 22px;
  border-radius: 25px;
  opacity: 0.9;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  background-color: #4b75f6;
  color: white;
  border: none;
}
.login-input {
  display: block;
  width: 485px;
  height: 60px;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 20px 0;
  background-color: #f7f4fa;
  border-radius: 30px;
  @include input-style;
}
.door-login {
  margin-top: 50px;
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
}
.door-wave {
  position: fixed;
  @include scale-method;
  bottom: -4px;
}
</style>
