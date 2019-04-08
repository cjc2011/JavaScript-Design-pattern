import './单例模式.js'
import './工厂模式.js'
import './装饰器模式.js'

// 打车类的实现
// class Car {
//   constructor(number, name) {
//     this.number = number 
//     this.name = name
//   }
// }

// class Kuaiche extends Car {
//   constructor(number, name) {
//     super(number, name)
//     this.price = 1
//   }
// }

// class Zhuanche extends Car {
//   constructor(number, name) {
//     super(number, name)
//     this.price = 2
//   }
// }

// class Trip {
//   constructor(car) {
//     this.car = car
//   }
//   start() {
//     console.log(`行程开始，名称${this.car.name}, 车牌号${this.car.number},`)
//   }
//   end() {
//     console.log(`行程结束，价格${this.car.price * 5}`)
//   }
// }

// var car = new Kuaiche(2019, '桑塔纳')
// var trip = new Trip(car) 
// trip.start()
// trip.end()

// 停车场

// 车辆
class Car {
  constructor(num) {
    this.num = num
  }
}

// 停车场
class Park {
  
  constructor(floors) {
    // 传入停车的每一层[floor, floor, floor]
    this.floors = floors || []
    // 初始化摄像头对象 返回对象的shot方法接收car的对象
    this.camera = new Camera()
    // 初始化显示屏对象 返回对象的show方法接收car inTime参数
    this.screen = new Screen()
    // 存储进入存车场车辆的信息
    this.carList = {}       // 存储摄像头拍摄的返回车辆信息
  }

  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 生成车位的随机数
    const i = parseInt(Math.random() * 100 % 100)
    
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }

  out(car) {
    // 获取信息
    const info = this.carList[car.num]
    // 将停车位清空 
    const place = info.place
    place.out()
    this.screen.show(car, info.inTime)
    delete this.carList[car.num]
  }

  emtypeNum() {
    return this.floors.map( floor => {
      return `${floor.index}层 还有${floor.emptyPlaceNum()}空余车位`
    }).join('\n')
  }

}

//摄像头 记录车牌号 进入时间
class Camera {
  shot(car) {
    return  {
      num: car.num,
      inTime: new Date()
    }
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log('车牌号', car.num)
    console.log('进入停车场', Date.now() - inTime)
  }
}

// 层
class Floor {
  constructor(index,places) {
    // 第几层
    this.index = index
    // 着一层有多少个停车位
    this.places = places || []
  }
  // 空余车位数量
  emptyPlaceNum() {
    let num = 0 
    this.places.forEach( p => {
      num = p.empty ? num + 1 : num 
    })
    return num
  }
}

//车位
class Place {
  constructor() {
    this.empty = true
  }

  in() {
    this.empty = false
  }

  out() {
    this.empty = true
  }
}

// 初始化一个存放停车楼层的数组
const floors = []
for (let i = 0; i < 3; i++) {
  // 每一楼层停车位的数组
  const places = []
  for (let j = 0; j < 100; j++) {
    // 初始化每一个车位
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}

const park = new Park(floors)

const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

console.log('第一辆车进入前')
console.log('每层停车数量', park.emtypeNum())
park.in(car1) 
console.log('第二辆车进入前')
console.log('每层停车数量', park.emtypeNum())
park.in(car2) 
// console.log('第一辆车离开')
// park.out(car1)
// console.log('每层停车数量', park.emtypeNum())
// console.log('第二辆车离开')
// park.out(car2)
