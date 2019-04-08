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

