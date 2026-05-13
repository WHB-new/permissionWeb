<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapse }">
      <div class="logo-wrapper">
        <div class="logo" v-if="!isCollapse">
          <span>后台系统</span>
        </div>
        <div class="logo-icon" v-else>
          <span>后台</span>
        </div>
      </div>
        <el-menu
          :default-active="$route.fullPath"
          class="el-menu-vertical"
          :collapse="isCollapse"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
          :unique-opened="false"
          :router="true"
        >

      <MenuItem
      :userRoutes="userRoutes"
      />
      </el-menu>
    </div>
</template>

<script>
import MenuItem from './menuItem'
export default {
  name: 'SideBar',
  components:{
    MenuItem
  },
  props:[
    'userRoutes',
    'isCollapse'
  ],
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 150px;
  transition: width 0.28s;
  background-color: #304156;
  position: relative;
  z-index: 100;
  height: 100vh;
  overflow-x: hidden;

  .logo-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2f3a;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    .logo {
      letter-spacing: 2px;
      white-space: nowrap;
    }
    .logo-icon {
      font-size: 20px;
    }
  }

  .el-menu {
    border-right: none;
    background-color: #304156;
    overflow: hidden;
  }

  &:not(.collapsed) {
    ::v-deep .el-menu-item,
    ::v-deep .el-submenu__title {
      padding-left: 12px !important;
    }
  }

  &.collapsed {
    width: 64px;

    .el-menu-item,
    .el-submenu__title {
      text-align: center !important;
      padding-left: 0 !important;
      padding-right: 0 !important;

      i {
        margin-right: 0 !important;
      }
    }
    // 隐藏文字
    ::v-deep .el-menu-item span,
    ::v-deep .el-submenu__title span {
      display: none !important;
    }
  }

}
</style>