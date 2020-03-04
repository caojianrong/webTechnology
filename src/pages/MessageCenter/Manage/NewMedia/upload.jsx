import React, { useState, useEffect, Fragment, useReducer } from 'react';
import { Modal, Form, Select, Input, Button, Upload, Icon } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  labelAlign: 'right',
  wrapperCol: { span: 18 },
};

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const propsFile = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// function reducer(state, action) {
//   switch (action.type) {
//     case 'addImage':
//       return (() => {
//         state.fileList = [
//           {
//             uid: '-1',
//             name: 'image.png',
//             status: 'done',
//             url:
//               'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//           },
//         ];
//         return state;
//       })();
//     case 'showImageModal':
//       return { ...state, ...{ previewVisible: !state.previewVisible } };
//     default:
//       return state;
//   }
// }

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [isVisible, setVisible] = useState(false);
  // 发布平台
  const [publishPlatform, setPublishPlatform] = useState('');


  // 上传图片显示
  const [isUploadImageShow, setUploadImageShow] = useState(false);

  // previewImage
  const [previewImage, setPreviewImage] = useState('');

  // fileList
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ])

  
  

  // 发布平台选择框更改事件
  function handleChange(value) {
    setPublishPlatform(publishPlatform);
  }

  // 新媒体发布模态框确定事件
  function handleOk() {
    setVisible(false);
  }

  // 新媒体发布模态框取消事件
  function handleCancel() {
    setVisible(false);
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setUploadImageShow(true);
  };

  function imageuploadHandleChange({fileList}) {
    setFileList({ fileList });
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <span onClick={() => setVisible(true)}>{props.children}</span>
      <Modal
        title="新媒体发布"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="发布平台">
            {getFieldDecorator(
              'email',
              {},
            )(
              <Select
                // style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="weibo">微博</Option>
                <Option value="lucy">公众号</Option>
                <Option value="ding">钉钉</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="平台账号">
            {getFieldDecorator('username', {
              // rules: [
              //   { required: true, message: '请输入用户名' }
              // ],
            })(<Input placeholder="请输入平台账号" />)}
          </Form.Item>
          {publishPlatform === 'luky' ? (
            ''
          ) : (
            <Form.Item label="推送对象">
              {getFieldDecorator(
                'obj',
                {},
              )(
                <Select
                // style={{ width: 120 }}
                // onChange={handleChange}
                >
                  <Option value="weibo">客户</Option>
                  <Option value="lucy">客户经理</Option>
                  <Option value="ding">运营人员</Option>
                  <Option value="yunying">运维人员</Option>
                </Select>,
              )}
            </Form.Item>
          )}
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              // rules: [
              //   { required: true, message: '请输入用户名' }
              // ],
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="内容">
            {getFieldDecorator('content', {
              // rules: [
              //   { required: true, message: '请输入用户名' }
              // ],
            })(<TextArea placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="上传图片">
            {getFieldDecorator(
              'image',
              {},
            )(
              <div className="clearfix">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={imageuploadHandleChange}
                >
                  {fileList.length >= 6 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={isUploadImageShow}
                  footer={null}
                  onCancel={() => setUploadImageShow(false)}
                >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </div>,
            )}
          </Form.Item>

          <Form.Item label="上传附件">
            {getFieldDecorator(
              'annex',
              {},
            )(
              <Dragger {...propsFile}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                <p className="ant-upload-hint">
                  支持扩展名：.rar .zip .doc .docx .pdf .jp
                </p>
              </Dragger>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const NewMedia = Form.create({ name: 'modal_Form' })(modalForm);

export default NewMedia;
