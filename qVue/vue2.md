# Questions about Vue.js(Vue2)
## 说说对mixin混入的理解
mixin混入对象的变量是不会共享的。
vue中的混入提供了一种非常灵活的方式，来实现vue组件的**可复用**性，一个混入对象可包含任意的组件选项，并且当组件使用混入对象时，所有混入对象的选项将和组件本身的选项进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行合并。
+ 数据对象(data)在内部会进行递归合并，并在发生冲突时以组件数据优先。
+ 同名钩子函数将会合并成一个数组，都将被调用，但是混入对象的钩子将在组件自身的钩子之前被调用。
+ 值为对象的选项，比如methods、components和directives，将被合并成一同个对象，两个对象键名冲突时，组件对象的键值对优先。
混入也可以进行全局注册，但是要注意，全局混入将会影响之后创建的每一个vue实例
## 说说对vuex机制的理解
vuex是专门为vuejs应用程序设计的**状态管理**工具，它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式变化。
vuex由几部分核心组成：
+ **state**。存储的是基础数据，表示单一状态
+ **getters**。getters是store的计算属性，对state进行加工，是派生出的数据。就像computed计算属性一样，getter返回的值会根据它的依赖缓存起来，且只有当它的依赖值发生改变时才会重新计算。
+ **mutations**。用以提交更改的数据，使用store.commit方法更改state存储的状态。
+ **actions**。actions更像一个装饰器，用于提交mutation，而不是直接变更状态。
+ **mudule**。是store分割的模块，每个模块拥有自己的state、getters、mutations、actions
+ **辅助函数**。vuex提供了mapState、mapGetters、mapActions、mapMutations等辅助函数，方便在vm中处理store
vuex的使用：
+ 安装vuex
```
npm i vuex -g
import Vuex from 'vuex'

Vue.use(Vuex)
```
+ 实例化vue.store
```
let store = new Vuex.Store({
    state,
    getters,
    modules,
    mutations,
    actions
})
```
+ 注入store，挂载到vue实例
```
new Vue({
    store,
    render: h => h(app)
}).$mount('#app');
```
## 说说对vue路由钩子函数的了解(Vue2.2)
vue-router提供的导航钩子主要用来拦截导航，让它完成跳转或取消
路由钩子主要有三种实现方式：
### 全局实现
+ 使用router.beforeEach注册一个全局的before钩子
```
var routes = [{
    path:'/route1',
    name:'route1',
    component:()=> import('./index.vue')
}]
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next)=>{
    next(false)
})
```
+ 使用全局的after钩子(没有next方法)
```
router.afterEach((to, from) => { ... })
```
### 某个路由独享的钩子
在路由配置上直接定义beforeEnter钩子
```
const router = new VueRouter({
    routes: [
        {
            path:'/foo',
            component: Foo,
            beforeEnter: (to, from, next) => { ... }
        }
    ]
})
```
### 组件内的路由钩子
在路由组件内直接定义以下路由导航钩子
```
const Foo = {
    template: `...`,
    beforeRouterEnter(to, from, next) {
        <!-- 在渲染该组件的对应路由被confirm前调用 -->
    },
    beforeRouterUpdate(to, from, next) {},
    beforeRouterLeave(to, from, next) {
        <!-- 导航离开该组件的对应路由时调用 -->
    }
}
```
### 路由钩子在实际开发中的应用场景[原文](https://www.cnblogs.com/goloving/p/9211295.html)
+ 清除当前组件中的定时器 
```
<!-- 当一个组件中有一个定时器时，在路由进行切换时，可使用beforeRouterLeave将定时器清除，以免占用内存 -->
beforeRouterLeave(to, from, next) {
    window.clearInterval(this.timer)
    next()
}
```
+ 当页面中有未关闭的窗口或未保存的内容时，阻止页面跳转
+ 保存相关内容到vuex中或session中
```
<!-- 当用户需要关闭页面时，可以将共用的信息保存到session或vuex中 -->
beforeRouterLeave(to, from, next) {
    localStorage.setItem(name, content)
    next()
}
```
## vue2.0的生命周期(组件钩子函数)
vue的生命周期就是vue实例从创建到销毁的过程。其作用就是：通过把握具体的生命周期，让开发者在控制vue实例的创建过程中形成更好的逻辑。
### beforeCreate
实例初始化之后
### created
实例创建完成，还未挂载到DOM，不能访问到$el的属性
### beforeMounte
### mounted
### beforeUpdate
这里的更新对象是模板，即需要虚拟DOM重新渲染和打补丁，beforeUpdate发生在这两个流程之前，此时新的虚拟DOM已经产生
### updated
在虚拟DOM重新渲染之后调用，此时组件DOM已经更新，可以执行依赖于DOM的操作(避免在这个钩子函数中操作数据，因为update声明周期内，不会承诺所有的子组件一起重绘)
### beforeDestroy
实例销毁之前调用。在这一步，实例仍然完全可用，this仍能获取到实例。
### destroyed
Vue实例销毁后调用。调用后，vue实例指示的东西都会解除绑定，所有的事件监听器都会被移除，所有的子实例也会被销毁。
**vue2.0之后又添加了3个周期**
### actived
激活
### deactivated
未激活
### errorCaptured
当捕获一个来自子孙组件的错误时被调用
## 谈谈对vue组件化的理解
组件是可复用的vue实例，如果网页中的某一个部分需要在多个场景中使用，那么我们可以将其抽出来形成一个组件进行复用。大大提高了代码的复用率。
## v-model是什么
v-model用于表单数据的双向绑定，其实它是一个语法糖，背后做了两个操作：
+ v-bind绑定了一个value属性
+ v-on指令给当前元素绑定input事件
## 谈谈对动态路由的理解
**动态路由，即能够提供参数的路由**
在实际应用中，常常需要把某种模式匹配到的所有路由，映射到同一个组件，比如商品详情页面，页面结构都一样，只是商品的ID不同，此时使用动态路由就很合适。
动态路由的创建，主要是在使用path属性过程中，使用动态路径参数(以冒号开头)，如：
```
import User from './User'
{
    path: '/user/:id',
    name:'user'
    component:User
}
```
通过this.$route.params获取动态路由的参数；
## 你是如何理解Vue的响应式系统的
+ 任何一个vue组件都有一个与之对应的watcher实例
+ vue的data对象的属性会被添加setter和getter属性
+ 当vue组件的render函数被执行时，会触发vue实例的data对象，即调用data对象属性的getter方法，此时vue会记录该组件所依赖的所有data
+ 当data被修改时，setter方法被调用，此时vue会通知所有依赖于该data的组件去调用render函数重新渲染页面。
## 谈谈ES6 Proxy和Object.defineProperty的优劣
### proxy的优势
+ proxy可以直接监听对象而非属性
+ proxy可以直接监听数组的变化
+ proxy有多重拦截方法，这是Object.defineProperty不具备的
+ proxy返回的是一个新对象，我们可以只操作新的对象达到目的，而Obhect.defineProperty只能遍历对象属性进行修改
+ proxy作为新的标准将会受到浏览器厂商重点持续的性能优化
### Object.defineProperty优势
+ 兼容性好，支持IE9
## computed和watch的区别
#### computed
+ computed是计算属性，它更多用于计算值的场景
+ computed具有缓存性，其值在getter执行后会缓存，只有在它依赖的属性值改变后，下一次获取computed的值时才会重新调用对应的getter来计算
+ computed适用于比较消耗性能的计算场景
#### watch
+ 更多的是**观察**作用，当数据变化时来执行回调进行后续的操作
+ 无缓存性，页面重新渲染时即使值没有变化也会执行
## 说说vuejs中的修饰符
修饰符是由点开头的指令后缀来表示的
#### 事件修饰符
+ .stop。阻止单击事件继续传播
+ .prevent。阻止默认事件
+ .capture。 添加事件监听器时使用事件捕获模式
```
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>
```
+ .self。只在当event.target是当前元素自身时触发处理函数
+ .once。点击事件将只会触发一次
+ .passive。
#### 按键修饰符
可以将[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)暴露的任意有效按键名转换为kebab-case(以短-连接)来作为修饰符
```
<!-- 处理函数只会在$event.key等于PageDown时被调用 -->
<input v-on:keyup.page-down="onPageDown">
```
**按键码keyCode的事件用法已经被废弃了并可能不会被最新的浏览器支持**，但是使用keyCode特性也是允许的。
```
<input v-on:keyup.13="submit">
```
为了在必要的情况下支持旧浏览器，Vue提供了绝大多数常用的按键码的别名：
```
.enter、.tab、.delete、.esc、.space、.up、.down、.left、.right
```
#### 系统修饰符
实现在仅在按下相应按键时才触发鼠标或键盘事件的监听器
```
.ctrl、.alt、.shift、.meta
```
**.exact**修饰符允许精确控制按键
```
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```
**鼠标按钮修饰符**
```
.left、.right、.middle
```

### vue-router源码分析(v3.5.3)
vue中每个插件内部都有一个install方法,该方法供Vue.use(plugin)时调用,方法参数默认会传入Vue对象
+ 定义了一个VueRouter类,该类中有install方法
+ install方法中,使用mixin混入一个beforeCreate钩子,该钩子函数内会根据根组件或子组件向vue实例上绑定router对象_routerRoot
+ install方法内还会将$router和$route绑定到Vue.prototype上,实现响应化