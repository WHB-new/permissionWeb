export function handleLogin(userName, passWord) {
     const roleMap = ['admin', 'user']
     const data = {
      token:userName,
     }
     const promise = new Promise((resolve, reject)=> {
       setTimeout(()=> {
        if (!passWord || !userName) return;
        if (roleMap.indexOf(userName) >= 0) {
          resolve({
            code:0,
            data,
            msg:'登录成功！'
          })
          return;
      }
      reject({
        code:400,
        msg:'请输入正确的用户名和密码！'
      })
       }, 1000)
     })
     return promise;
}


