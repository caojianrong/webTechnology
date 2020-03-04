// 消息配置
const deploy = {
  dataSource: [],
  async fetchData1() {
    // 模拟异步请求
    const data = await new Promise(resolve =>
      setTimeout(() => {
        resolve([
          { name: 'react' },
          { name: 'vue', done: true},
          { name: 'angular' },
        ]);
      }, 1000)
    );
    this.dataSource = data;
  },

  add(todo) {
    this.dataSource.push(todo);
  },
};

export default deploy;