import React, { useState, useEffect, Fragment } from 'react';
import {message} from '@wocloud/design';
import { Modal, Form, Select, Input, Button, Upload, Icon } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  labelAlign: 'right',
  wrapperCol: { span: 18 },
};

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const IMAGE_UPLOAD_STATE = {
  previewVisible: false,
  previewImage: '',
  fileList: [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
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
  ],
};

function modalForm(props) {
  const { getFieldDecorator } = props.form;

  const [isVisible, setVisible] = useState(false);
  // 发布平台
  const [publishPlatform, setPublishPlatform] = useState('');
  // 上传图片
  const [imageUploadState, setImageUploadState] = useState(IMAGE_UPLOAD_STATE);

  // 图片fileList


  // 点击上传用户头像，使用 beforeUpload 限制用户上传的图片格式和大小
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error('Image must smaller than 2MB!');
    }
    // beforeUpload 返回 false 后，手动上传文件
    return isJpgOrPng && isLt2M;  
  }

  // 将图片转换为base64
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  function imageHandleChange (info) {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // }),
      });
    }
  };



  // 发布平台下拉框选择事件
  function handleChange(value) {
    setPublishPlatform(publishPlatform);
  }

  function handleOk() {
    setVisible(false);
  }
  function handleCancel() {
    setVisible(false);
  }

  function uploadHandleCancel() {
    setImageUploadState({...imageUploadState, ...{previewVisible: false}});
  }

  // handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handleChange = ({ fileList }) => this.setState({ fileList });

  const { previewVisible, previewImage, fileList } = imageUploadState;
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
        width={800}
        title="新媒体发布"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            提交
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]}
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
                  beforeUpload={beforeUpload}
                  // onPreview={this.handlePreview}
                  onChange={imageHandleChange}
                >
                  {fileList.length >= 6 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={uploadHandleCancel}
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
              <Dragger {...props}>
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
