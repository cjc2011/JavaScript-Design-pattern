// 登录框 购物车
// 一个构造函数只能有一个对象实例
// 案例 登陆

class SingleObject {
  login() {
    console.log('登陆....')
  }
}

SingleObject.getInstance = (function() {
  let instance 
  return function() {
    if (!instance) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let a = SingleObject.getInstance()
let b = SingleObject.getInstance()
console.log(a === b, 'a ,b')