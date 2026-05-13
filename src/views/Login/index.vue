<template>
  <div class="login-container">
    <div class="login-card">
      <div class="title">
        <h3>欢迎登录</h3>
        <p>用户名只有admin和user 密码随意 用户名直接对应相应角色</p>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-width="0"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { handleLogin } from '@/mock/index'
export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
      remember: false,
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        // 表单验证通过
        if (valid) {
          this.loading = true;
          try {
            // 登录成功后获取用户roles
            const res = await handleLogin(this.loginForm.username, this.loginForm.password)
            if (res.code === 0) {
              sessionStorage.setItem('token', res.data.token)
              await this.$store.dispatch('user/setUserRoutes')
              this.loading = false;
              const routes = this.$store.state.user.userRoutes
              routes.forEach(route => {
                this.$router.addRoute('Home', route)
              })
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.$router.push({ path: '/stopCar' })
            }
            }catch(error) {
              this.loading = false;
              this.loginForm.password = ''
              this.$message({
                message: error.msg,
                type: 'error'
              });
            }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(120deg, #3a1c71, #d76d77, #ffaf7b);
  
  // 光晕1：紫色调，偏左上
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -20%;
    width: 70%;
    height: 70%;
    background: radial-gradient(circle, rgba(147, 51, 234, 0.4), transparent 70%);
    filter: blur(80px);
    pointer-events: none;
  }
  
  // 光晕2：橙色调，偏右下
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -20%;
    width: 70%;
    height: 70%;
    background: radial-gradient(circle, rgba(255, 126, 0, 0.35), transparent 70%);
    filter: blur(100px);
    pointer-events: none;
  }
  
}

.login-card {
  width: 520px;
  padding: 40px 35px 15px 35px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;

  .title {
    margin-bottom: 40px;
    h3 {
      font-size: 26px;
      color: #333;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #666;
    }
  }

  .login-form {
    .el-input {
      ::v-deep .el-input__inner {
        height: 44px;
        line-height: 44px;
      }
      ::v-deep .el-input__prefix {
        font-size: 18px;
        line-height: 44px;
      }
    }
    .login-btn {
      width: 100%;
      font-size: 16px;
      height: 44px;
      background: #409eff;
      border-color: #409eff;
    }
    .el-checkbox {
      float: left;
      margin-top: 5px;
    }
  }
}
</style>