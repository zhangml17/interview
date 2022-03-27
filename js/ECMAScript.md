## ECMAScript
脚本语言的规范, Es新特性即JavaScript的新特性

### ES6新特性
1. let变量不能重复声明
块级作用域,不存在变量提升（必须先声明后使用）
2. 解构赋值
3. 模板字符串
4. 简化对象写法
5. 箭头函数：this是静态的、不受call, apply等改变this指向，它不能作为构造函数实例化对象，不能实用arguments
6. 函数参数默认值
7. rest参数：用于获取函数的实参、用来代替arguments，该参数必须放到参数列表最后
8. 扩展运算符
9. Symbol：es 6引入的新的原始数据类型，其值唯一，不能与其他数据进行运算，symbol.For方法创建的两个值是相等的。
Symbol内置值
10. 迭代器 iterat or:任何数据物只要部署iterator接口，就可以完成遍历操作,该接口主要供for… of消费。主要用来自定义遍历数据
11. 生成器：是ES6提供的一种异步编程解决方案

12. promise是 ES6引入的异步编程的新解决方案，then方法的返回结果是promise对象，对象状态由回调函数的执行结果决定
13. set：ES6提供的新的数据构（集合）
14. map
15. Class
16. Getter和setter
17. 数值的扩展
18. 对象方法扩展: 
is:  object.is(120, 120)
assign:对象合并
setPrototypeOf:设置原型对象。getPrototypeOf 获取原型
19. 模块化:模块化指将一个大的程序文件拆分为多个小的文件,多个小文件再灵活组合
优点:防止命名冲突;代码复用;高维护性;
export import

### ES7新特性
1. Array.prototype.includes
2. 指数操作符 ** .例如:2的10次方。2**10

### ES8新特性
1. async和await:两者结合使得异步代码如同步代码书写一样
2. 对象方法扩展
Object.values:返回给定对象可枚举属性值的数组
Object.entries: 返回给定对象自身可遍历属性[key,value]的数组
Object.getOwnPropertyDescriptors:返回指定对象所有自身属性的描述对象

### ES9新特性
1. 扩展运算符
2. rest参数:es6中是只针对数组,es9中,也为对象提供了
3. 正则扩展<br>
命名捕获分组
反向断言
dotAll模式: 即通配符 .

### ES10新特性
1. 对象扩展方法  Object.fromEntries:将二维数组或map构建成一个对象
2. 字符串方法扩展。
trimStart、trimEnd.即trim方法的分割,分别清楚左侧空白和右侧空白
3. 数组方法扩展
flat(n):将多维数组转换为低维数组,参数n为深度
flatMap():相当于map方法的扩展,将多维数组转换为低维结果
4. Symbol的扩展  Symbol.protorype.description

### ES11新特性
1. 私有属性: #属性名,只能在类内部访问
2. Promise.allSettled,接收一个promise数组,返回结果始终是成功的
3. 字符串扩展. String.prototype.matchAll().获取正则批量匹配的结果.返回结果是一个可迭代对象
4. 可选链操作符. ?.
5. 动态import.   import().then()
6. BigInt 大整型数据。 123n
7. 绝对全局变量globalThis.始终指向全局对象