import router from './index';
import store from '@/store'
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 没token重定向回登录页
  if (!sessionStorage.getItem('token')) {
    // 防止一直触发路由守卫死循环
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  return;
  }
  // 白名单不验证
  if (whiteList.includes(to.path)) {
    next()
    return;
  }
  // 登录或者是刷新页面导致用户路由信息过期 重新获取在放行
  if (store.state.user.userRoutes.length === 0) {
    try {
      await store.dispatch('user/setUserRoutes')
      store.state.user.userRoutes.forEach(item=>{
        router.addRoute('Home', item)
      })
      next({ ...to, replace: true })
    }catch(err){
      next('/login')
      console.log(err,'err')
    }
    return;
  }
    next()
})