// Promise读取文件
const fs = require('fs')
const p = new Promise((resolve, reject) => {
    fs.readFile('../README.md', (err, data) => {
        if(err) reject(err)
        resolve(data)
    })
})
p.then(function(value){
    console.log(value.toString())
}, function(error) {
    console.log('读取失败')
})