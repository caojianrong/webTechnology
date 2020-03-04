// 由于 ice.config.js 中使用 theme 配置，所以这里使用 CommonJS 语法
// 由于 routes 中导入多个页面组件和 UI 组件，易引起未知错误，所以此处不引入

const theme = require('./theme');

module.exports = {
  prefixCls: 'yunce',
  theme,
};
