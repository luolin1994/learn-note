# 一. Promise

- ES6中的特性
- 是异步编程的一种解决方案，封装异步操作
- 三种状态：等待状态、满足状态、拒绝状态

防守打法

# 二. Vuex

## 1.核心概念

- State

​      单一状态树：只创建一个store对象

- Getters

​    类似于组件的计算属性

​    携带参数的使用方法

- Mutation

​         Vuex的store状态的更新唯一方式：提交Mutation

​        主要包括两部分：1）字符串的事件类型(type)；2）一个回调函数，该回调函数的第一个参数就是state。

​       通过mutation更新：this.$store.commit(事件类型)

​       携带参数的使用方法，参数被称为mutation的payload

​       mutation的提交风格，特殊提交，使用type

​      mutation的响应式规则：1）提前在store中初始化好所需要的属性，若想要响应式增添可使用响应式方法（set，Vue.delete()）

​       将mutation的方法名字抽成常量

​       mutation内的方法必须是同步方法，否则devtools调式工具不能很好追踪

Action

- Module

  当应用变得非常复杂时，store对象就有可能变得相当臃肿，为了解决这个问题，Vuex允许我们将store分割成模块(Module), 而每个模块拥有自己的state、mutation、action、getters等



# 三. 网络请求封装



# 四.项目开发

