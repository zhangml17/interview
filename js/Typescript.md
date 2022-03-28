# Typescript
### 类型声明
number、string、boolean、字面量、any、unknown、void、never、object、array、tuple、enum
+ unknow类型的值可以被赋予任何类型的值,但是不能赋予给指定类型的变量
+ 类型断言 as
### 编泽选项：compilerOptions
### webpack打包ts代码
### 面向对象：类，构造函数，继承，super
### 抽象类：作为超类，不希望能够被实例化．专门用来被继承。抽象类中可以定义抽象方法、仅定义结构，不定义实现．具体实视由子类定义，子类必须对抽象方法进行重写
### 接口interface：implements,接口中全是抽象法，抽象类中可以有普通方法
接口和type的区别：接口可以重复定义，并且会自动合并，但接口只能用来修饰类、函数、对象等复杂数据类型，而type不可以重复定义，但能用来修饰所有类型的数据
### 属性的封装：即将属性封装为外部不可以直接修改(数据安全).  可以使用内部函数封装属性的set、get,也可以使用get 和set关键词修饰属性即可
private : 只能在当前类内部使用
protected:只能在当前类和当前类的子类中使用
### 范型