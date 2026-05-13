<template>
  <div class="homepage-container">
    <!-- 侧边栏 -->
  <SideBar
  :userRoutes="enrichedRoutes"
  :isCollapse="isCollapse"
  ></SideBar>

    <!-- 右侧主体 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <div class="navbar">
        <div class="left">
          <i class="el-icon-menu fold-btn" @click="toggleSidebar"></i>
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item>{{breadcrumbTitle}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>仪表盘</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div class="right">
          <el-dropdown trigger="click" @command="handleDropDown">
            <div class="avatar-wrapper">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="avatar" />
              <span class="name">{{userName}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="goUser">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  components: { SideBar },
  data() {
    return {
      isCollapse: false,
      breadcrumbTitle: '',
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
    },
    getRouteFullPath(routes, parentPath = '') {
      if(!routes || !routes.length) return [];
      return routes.map(route => {
        let full;
        // 判断是绝对路劲还是相对路径
        if(route.path.startsWith('/')) {
          full = route.path
        } else {
          full = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`
        }
        const newRoute = {
          ...route,
          fullPath: full
        }
        if(route.children && route.children.length) {
          newRoute.children = this.getRouteFullPath(route.children, full)
        }
        return newRoute
      })
    },
    handleLogOut() {
      sessionStorage.removeItem('token')
      this.$store.dispatch('user/resetState')
      this.$router.push('/login')
      this.$message.success('退出登录成功')
    },
    handleDropDown(command){
      switch(command) {
        case 'logout':
          this.handleLogOut()
          break
      }
    }

  },
  computed: {
    ...mapState('user', ['userRoutes']),
    // children带有完整路劲，用于侧边栏跳转
    enrichedRoutes() {
      return this.getRouteFullPath(this.userRoutes)
    },
    userName() {
      return sessionStorage.getItem('token')
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.breadcrumbTitle = route.meta.title;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.homepage-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  overflow: hidden;
  .navbar {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .left {
      display: flex;
      align-items: center;
      .fold-btn {
        font-size: 20px;
        cursor: pointer;
        margin-right: 20px;
        color: #666;
        &:hover {
          color: #409eff;
        }
      }
      .breadcrumb {
        line-height: 20px;
        font-size: 14px;
      }
    }
    .right {
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .name {
          font-size: 14px;
          margin-right: 5px;
          color: #333;
        }
        i {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
}
</style>