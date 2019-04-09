// 发布&&订阅 一对多

class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  notifyAllObservers() {
    this.observers.forEach( observer => {
      observer.update()
    })
  }
  attach(observer) {
    this.observers.push(observer)
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name 
    this.subject = subject 
    this.subject.attach(this)
  }
  update () {
    console.log(`this.name, ${this.name}`, this.subject.state)
  }
}

let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('o2', s)
let o3 = new Observer('o3', s)

s.setState(1)
s.setState(2)
s.setState(3)
console.log('=========================')
