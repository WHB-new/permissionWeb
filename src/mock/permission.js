import { cloneDeep } from 'lodash';
const asyncRoutes = [
  {
    path: 'stopCar',
    name: 'StopCar',
    component: () => import('@/views/StopCar/index.vue'),
    meta: { title: '停车地点', icon: 'el-icon-location', roles: ['admin', 'user'] }
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] },
    component: () => import('@/views/User/index.vue'),
    redirect: '/user/list',
    children: [
      { path: 'list', name:'userList', component: () => import('@/views/User/UserList/index.vue'), meta: { title: '用户列表', roles: ['admin'] } },
      { path: 'role', name:'userRole', component: () => import('@/views/User/RoleList/index.vue'), meta: { title: '角色列表', roles: ['admin'] } }
    ]
  },
  {
    path: 'order',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-s-order', roles: ['admin'] },
    component: () => import('@/views/Order/index.vue'),
    redirect: '/order/list',
    children: [
      { path: 'list', name:'orderList',component: () => import('@/views/Order/OrderList/index.vue'), meta: { title: '订单列表', roles: ['admin'] } },
      { path: 'config', name:'orderConfig',component: () => import('@/views/Order/OrderConfig/index.vue'), meta: { title: '订单配置', roles: ['admin'] } },
      { path: 'my', name:'my-order',component: () => import('@/views/Order/MyOrder/index.vue'), meta: { title: '我的订单', roles: ['admin'] } }
    ]
  },
  {
    path: 'my-orders',
    name: 'MyOrders',
    component: () => import('@/views/Order/MyOrder/index.vue'),
    meta: { title: '我的订单', icon: 'el-icon-s-order', roles: ['user'] }
  },
  {
    path: 'system',
    name: 'System',
    component: () => import('@/views/System/index.vue'),
    meta: { title: '系统设置', icon: 'el-icon-setting', roles: ['admin'] }
  },
  {
    path: 'profile',
    name: 'Profile',
    component: () => import('@/views/Profile/index.vue'),
    meta: { title: '个人设置', icon: 'el-icon-user', roles: ['admin', 'user'] }
  }
]

const routesMap = ['user', "admin"]
function filterRoutes(routes, role) {
  return routes.filter(route => {
    const hasRole = route.meta?.roles && route.meta.roles.includes(role);
    if (!hasRole) return false;
    if (route.children && route.children.length > 0) {
      route.children = filterRoutes(route.children, role);
      // 如果children全被过滤之后，整个都过滤掉 否则menu会出现一个空白区域
      if (route.children.length === 0) return false
    }
    return true;
  })
}
// 获取对应角色的可进入路由表
export function getUserRoutes(roles) {
   const data = {
     userRoutes: []
   }
    if (!routesMap.includes(roles)) {
      return Promise.reject({
        code: 400,
        msg: '没有找到该角色',
        data
      })
     }
    const cloneAsyncRoutes = cloneDeep(asyncRoutes)
    data.userRoutes = filterRoutes(cloneAsyncRoutes, roles)
    return new Promise(resolve=> {
     setTimeout(()=>{
       resolve({
        code: 0,
        msg: '获取该角色的路由成功',
        data
       })
     }, 1000)
   })
}
// 根据token查询该用户的角色role
export function getUserRole(token) {
  if (!token) {
    return Promise.reject({
      code: 401,
      msg: '请先登录',
    })
  }
  return new Promise(resolve=> {
    setTimeout(()=>{
      resolve({
        code: 0,
        msg: '获取用户角色成功',
        data: {
          role: token
        }
      })
    }, 1000)
  })

}
