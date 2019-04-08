class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    alert('init')
  }
  fn1() {
    alert('fn1')
  }
  fn2() {
    alert('fn2')
  }
}

// 工厂模式通常有一个create的函数 
// 场景1 jQuery $函数 window.$ = function(select) { return new jQquery(selector)}  jQquery为构造函数
// 场景2 React.createElement = function(tag, attrs, children) { return new Vnode(tag, attrs, chilren)}
class Creator {
  create(name) {
    return new Product(name)
  }
}

let creator = new Creator()
let p = creator.create('p1')
// p.init()
// p.fn1()