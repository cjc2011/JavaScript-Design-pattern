class ReadImg {
  constructor(fileName) {
    this.fileName = fileName 
    this.loadFromDisk()
  }
  display() {
    console.log('display...' + this.fileName)
  }
  loadFromDisk() {
    console.log('loading...' + this.fileName)
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName)
  }
  display() {
    this.realImg.display()
  }
}

// ES6 proxy 案例
// 明星类
let star = {
  name: '陈**',
  age: 30,
  phone: 133333333
}

// 经纪人类
let agent = new Proxy(star, {
  get: function(target, key) {
    if (key == 'phone') {
      return '16693232323232'
    }
    if (key == 'price') {
      return 120000
    }
    return target[key]
  },
  set: function(target, key, val) {
    if (key == 'customPrice') {
      if (val < 100000) {
        throw new Error('报价过小')
      } else {
        target[key] = val
        return true
      }
    }
  }
})

console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)
agent.customPrice = 199999
console.log(agent.customPrice, 'customPrice')