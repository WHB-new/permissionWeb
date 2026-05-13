<template>
  <div>
        <template v-for="route in userRoutes">
          <el-submenu 
          v-if="route.children && route.children.length"
          :key="route.fullPath + 'subMenu'"
          :index="route.fullPath">
           <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{ route.meta.title }}</span>
           </template>
           <SideBarItem
           :userRoutes="route.children">

           </SideBarItem>
          </el-submenu>
          <el-menu-item
          v-else
          :key="route.fullPath + 'menuItem'"
          :index="route.fullPath">
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
          </el-menu-item>
        </template>
</div>
</template>

<script>

export default {
  name: 'SideBarItem',
  props:[
    'userRoutes',
  ],
}
</script>

<style scoped lang="scss">

</style>