// 1、正则扩展--命名捕获分组
let str = `<a href="http://www.baidu.com">我要上百度</a>`
let reg = /<a href="(?<url>.*)">(?<content>.*)<\/a>/;
let result = reg.exec(str)
console.log(result.groups);

// 2、正则扩展--反向断言
// 正向断言 ?=:根据后面的内容去匹配
let str = 'AAAAA123123BBB'
let reg1 = /\d+(?=B)/
let result1 = reg1.exec(str)
console.log(result1)
// 反向断言 ?<=: 根据前面内容去匹配
let str = 'AAAAA123123BBB'
let reg2 = /(?<=A)\d+/
let result2 = reg2.exec(str)
console.log(result2)