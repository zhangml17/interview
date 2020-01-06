# Questions about Vue.js
## 说说对mixin混入的理解
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
