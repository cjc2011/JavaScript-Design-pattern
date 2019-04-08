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

// @demo(false)
// class Test {

// }

// alert(Test.isDec)
function demo(isDec) {
  return function(target) {
    target.isDec = isDec
  }
}
