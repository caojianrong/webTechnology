function reducer(state, action) {
  switch (action.type) {
    
    // 添加图片
    case 'addImage':
      return (() => {
        state.fileList = [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url:
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ];
        return state;
      })();

    // 删除图片
    case 'removeImage':
      return (() => {
        state.fileList.shift();
      })();

    // 控制模态框的显示隐藏
    case 'showImageModal':
      return { ...state, ...{ previewVisible: !state.previewVisible } };
    default:
      return state;
  }
}

export default reducer;
