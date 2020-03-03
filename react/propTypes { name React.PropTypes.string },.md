[TOC]

# 使用 PropTypes 进行类型检查

propTypes: { name: React.PropTypes.string }, 

```
import PropTypes from 'prop-types';
MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```





<https://www.npmjs.com/package/prop-types>

Props 是 React 中属性的简写。它们是只读组件，必须保持纯，即不可变

static defaultProps = {
name: 'React'
}

// 使用箭头函数创建的组件，需要在这个组件上直接写defaultProps属性
Content.defaultProps = {
name: 'React.js'
}

# state

`this.state()` 访问

可以用 `this.setState()`更新组件的状态。

1.  constructor() { 
2. ​        super(); 
3. ​        this.state = { name: 'world' }; 
4. ​    } 

setState有两个参数
第一个参数可以是对象，也可以是方法return一个对象，我们把这个参数叫做updater

参数是对象
this.setState({
isLiked: !this.state.isLiked
})
1
2
3
参数是方法
this.setState((prevState, props) => {
return {
isLiked: !prevState.isLiked
}
})
1
2
3
4
5
注意的是这个方法接收两个参数，第一个是上一次的state, 第二个是props
setState是异步的，所以想要获取到最新的state，没有办法获取，就有了第二个参数，这是一个可选的回调函数

this.setState((prevState, props) => {
return {
isLiked: !prevState.isLiked
}
}, () => {
console.log('回调里的',this.state.isLiked)
})
console.log('setState外部的',this.state.isLiked)
————————————————
尽量少地用 state，多用 props。
没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。
##状态提升
如果有多个组件共享一个数据，把这个数据放到共同的父级组件中来管理
————————————————
版权声明：本文为CSDN博主「搞前端的正则妈」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xuwei1215225/article/details/90180252

# 事件绑定

e.preventDefault()

<MyInput onChange = {this.handleChange.bind(this) } /> 

 <MyInput onChange = { (e)=>this.handleOnChange(e) } /> 

事件作为函数而不是字符串传递。

1.  Render the div with an onClick prop (value is a function)         
2. ​        return (             
3. ​            <div onClick={this.show}>Click Me!</div> 

直接在render里写行内的箭头函数(不推荐)
在组件内使用箭头函数定义一个方法(推荐)
直接在组件内定义一个非箭头函数的方法，然后在render里直接使用onClick={this.handleClick.bind(this)}(不推荐)
直接在组件内定义一个非箭头函数的方法，然后在constructor里bind(this)(推荐)
————————————————
事件的参数传递
在render里调用方法的地方外面包一层箭头函数
在render里通过this.handleEvent.bind(this, 参数)这样的方式来传递
通过event传递
比较推荐的是做一个子组件, 在父组件中定义方法，通过props传递到子组件中，然后在子组件件通过this.props.method来调用

handleInputChange = (e) => {
this.setState({

[e.target.name]: e.target.value
})
————————————————
版权声明：本文为CSDN博主「搞前端的正则妈」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xuwei1215225/article/details/90180252

# ref

### 创建 Refs

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### 访问 Refs

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。

### 回调 Refs

```kotlin
<input type="text" ref={input=>this.yjwInput=input} onChange={this.inputChange} />

// 其它地方获取 input 元素 ：this.yjwInput
this.yjwInput.value 
```

```csharp
<input type="text" ref='yjwInput' onChange={this.inputChange} />

// 其它地方获取该 input 元素 ：this.refs.yjwInput
this.refs.yjwInput.value 
```

- 挂到组件(`class`声明的组件)上的ref表示对组件实例的引用。**不能**在函数式组件上使用 ref 属性，因为它们没有实例：
- 挂载到dom元素上时表示具体的dom元素节点。
    在React 最新的版本中，要使用`ref`, 需要使用`React.createRef`方法先生成一个`ref`。

https://react.docschina.org/docs/refs-and-the-dom.html>



# React Hooks

有了React Hooks，在 react 函数组件中，也可以使用类组件（classes components）的 state 和 组件生命周期。

React Hooks 的规则
只能在顶层调用Hooks。不要在循环，条件或嵌套函数中调用Hook。
不要从常规JavaScript函数中调用Hook。只在React函数式组件调用Hooks。
自定义hooks可以选择讲解
react 内置hooks api
Basic [Hooks](/hooks-reference.html#basic-hooks) 
useState
useEffect
useContext
Additional [Hooks](/hooks-reference.html#additional-hooks)
useReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue
————————————————
`MVC`的全名是`Model View Controller`，是模型(model)－视图(view)－控制器(controller)的缩写，是一种软件设计典范。

