面试官:(基础问题) 让两个div在一行显示, 你能想到几种做法?
我:让两个div在一行显示有一下几种方式:1-浮动;2-定位;3-改变定位模式(将div的display设置为inline-block);4-使用flex布局

面试官:(js基础)js如何实现一个缓动动画, 让目标元素移动,到指定时间停止动画
我: 首先应该对目标元素进行定位, 然后启动一个间歇定时器(setIterval), 在定时器内部通过操作dom的形式去修改目标元素的left偏移量, 定时器开始的时候应该去记录一个时间戳,并且将定时器的id保存下来(因为将来要清除定时器), 定时器每执行一次用该获取最新的时间戳,减去起始时间戳, 判断是否达到约定的时间点, 如果时间到了,应该清除定时器 
————————————————
面试官: (性能问题)什么是浏览器的回流和重绘,那些操作会引起浏览器的回流和重绘?
我:回流是指浏览器对页面上的dom元素进行重新排列或排版;重绘是指浏览器对页面进行重新渲染(不进行重新排版).
如果我们修改了一个元素的位置信息或者尺寸信息会引起浏览器的回流(重新排版);
如果我们对某一个元素的外观样式做了修改(比如修改了背景色),那么必将引起浏览器的重绘(重新绘制页面);
所以回流必将引起重绘, 重绘不一定会引起回流
————————————————
如何查看一个对象的属性是继承来的还是他自己的？
说一下你了解的 ES6 的 Api ？

事件的冒泡和捕获？同时在一组 DOM 上绑定冒泡和捕获的事件，他该怎么触发？

自己用 webpack 搭建 Vue 项目，而不是用 vue-cli 怎么搭建？webpack 配置？
如何规划一个项目？



[JSON](https://blog.csdn.net/hansexploration/article/details/80314948)

[ajax](https://segmentfault.com/a/1190000006669043)