# Questions about Vue.js
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
## 说说对vue路由钩子函数的了解
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
before
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
