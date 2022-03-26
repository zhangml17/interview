// 生成器函数--参数传递
function * gen(params) {
    console.log(params);
    let rs1 = yield 111
    console.log(rs1);
    let rs2 = yield 222
    console.log(rs2);
    let rs3 = yield 333
    console.log(rs3);
}

const iterator = gen('整体传参参数')
console.log(iterator.next()) // 不用传
console.log(iterator.next('bbb'))
console.log(iterator.next('ccc'))
console.log(iterator.next('ddd'))

// 生成器函数--异步编程
function one() {
    setTimeout(() => {
        console.log(111);
        iterator.next()
    }, 1000)
}
function two() {
    setTimeout(() => {
        console.log(222);
        iterator.next()
    }, 2000)
}
function three() {
    setTimeout(() => {
        console.log(333);
    }, 3000)
}
function * gen() {
    yield one()
    yield two()
    yield three()
}
const iterator = gen()
iterator.next()

// 生成器函数--模拟获取
function getUers() {
    setTimeout(() => {
        let data = '用户数据'
        iterator.next(data)
    }, 1000)
}
function getOrders() {
    setTimeout(() => {
        let data = '订单数据'
        iterator.next(data)
    }, 1000)
}
function getGoods() {
    setTimeout(() => {
        let data = '商品数据'
        iterator.next(data)
    }, 1000)
}

function * gen() {
    let users = yield getUers()
    console.log(users);
    let orders = yield getOrders()
    console.log(orders);
    let goods = yield getGoods()
    console.log(goods);
}
const iterator = gen()
iterator.next()

