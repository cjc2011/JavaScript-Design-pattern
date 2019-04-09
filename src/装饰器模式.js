class Circle {
  draw() {
    console.log('画一个圆')
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle 
  }
  draw() {
    this.circle.draw()
    this.setRedBorder()
  }
  setRedBorder(circle) {
    console.log('设置红色边框', circle)
  }
}

let circle = new Circle()
circle.draw()
let decorator_circle = new Decorator(circle)
decorator_circle.draw()
decorator_circle.setRedBorder(circle)

//==================================

@demo(false)
class Test {

}

console.log(Test.isDec)
function demo(isDec) {
  return function(target) {
    target.isDec = isDec
  }
}


// 案例 mixin
let Foo = {
  foo() {
    console.log('Foo.foo')
  }
}

function mixin(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}

function readonly(target, name, descriptor) {
  // descriptor为一个js描述对象 详情https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  descriptor.writable = false 
  return descriptor
}

@mixin(Foo)
class Myclass {
  constructor(sex) {
    this.sex = sex
  }

  @readonly  
  setsex() {
    this.sex = '男'
  }
}

var myClass = new Myclass()

myClass.foo()
// myClass.setsex = function () {} setsex设置为只读  重新赋值会报错


// 应用场景api类调用前 执行log
// 装饰器类库 core-decorators  https://github.com/jayphelps/core-decorators 封装了 @readonly(只读) @deprecate(废除) 方法不执行
class Math {
  @log
  add(a, b) {
    return a+b
  }
}

function log(target, name, descriptor) {
  console.log(target, name, descriptor, 'descriptor')
  let oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`_calling${name} width ${arguments}`)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

let math = new Math()

let result = math.add(1,2)