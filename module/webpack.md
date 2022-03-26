# webpack
### webpack的打包顺序流程
1. 初始化参数:读取命令行传入或者webpack.config.js文件,初始化本次构建的配置参数
2. 开始编译:将得到的参数初始化Compiler对象,加载所有配置的插件,通过执行该对象的run方法开始执行编译
3. 确定入口:根据配置中的entry找出所有入口文件
4. 编译模块: 从入口文件出发,调用所有配置的loader对模块进行编译,再找出对应模块依赖的模块,依次编译所有模块
5. 完成模块编译: 完成所有模块编译之后,得到每个模块被编译后的内容及它们之间的依赖关系
6. 输出资源:根据入口和模块之间的依赖关系,组装成一个个包含多个模块的chunk,再将每个chunk转换成一个单独的文件加入输出列表中
7. 完成输出:在确定好输出内容之后,根据配置确定输出的路径和文件名,将文件的内容写入文件系统
### webpack常见loader及其作用
+ css-loader: 加载css,编译转化@import、url方式引入的样式
+ style-loader:创建style标签,将css-loader处理后的css放入style标签内,再将style标签插入html页面的head中
+ babel-loader:将ES6语法转换为ES5
+ file-loader:把文件输出到一个文件夹中,在代码中通过相关URL去引用输出的文件
+ url-loader:和file-loader类似,他有一个limt参数,小于该参数的文件会转化为base64字符串,大于的话同file-loader
+ image-loader:加载并且压缩图片文件
+ source-map-loader:加载额外的Source map文件,方便断点调试
+ eslint-loader:通过eslint检查js代码