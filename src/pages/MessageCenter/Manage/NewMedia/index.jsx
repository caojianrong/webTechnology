import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { message } from '@wocloud/design';
import { Card } from '@/components';
import {
  Form,
  Select,
  Input,
  Button,
  Row,
  Col,
} from 'antd';

import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import styles from './less/draft.css';
// import './less/main.css';

import styles from './less/newmedia.module.less';

const formItemLayout = {
  labelCol: { span: 6 },
  labelAlign: 'right',
  wrapperCol: { span: 14 },
};

const tailFormItemLayout = {
  labelCol: { span: 3 },
  labelAlign: 'right',
  wrapperCol: { span: 19 },
};

const { Option } = Select;
const { TextArea } = Input;

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

function onEditorStateChange(editorState) {
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  console.log(editorState);
}

const NewMedia = Form.create()(props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  return (
    <Card>
      <div className={styles.newMedia}>
        <h1>新媒体发布</h1>
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="发布平台">
                {getFieldDecorator(
                  'email',
                  {},
                )(
                  <Select
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  >
                    <Option value="weibo">微博</Option>
                    <Option value="lucy">公众号</Option>
                    {/* <Option value="ding">钉钉</Option> */}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="平台账号">
                {getFieldDecorator(
                  'username',
                  {},
                )(<Input placeholder="请输入平台账号" />)}
              </Form.Item>{' '}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="标题">
                {getFieldDecorator(
                  'title',
                  {},
                )(<Input placeholder="请输入标题" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Form.Item label="消息内容" {...tailFormItemLayout}>
              {getFieldDecorator(
                'message',
                {},
              )(
                <Editor
                  wrapperClassName={styles['demo-wrapper']}
                  editorClassName={styles['demo-editor']}
                  toolbarClassName={styles['toolbar-class']}
                  localization={{
                    locale: 'zh',
                  }}
                  toolbar={{
                    fontFamily: {
                      options: [
                        '宋体',
                        '黑体',
                        '楷体',
                        '微软雅黑',
                        'Arial',
                        'Georgia',
                        'Impact',
                        'Tahoma',
                        'Times New Roman',
                        'Verdana',
                      ],
                    },
                  }}
                  onEditorStateChange={onEditorStateChange}
                  // toolbar={{
                  //   inline: { inDropdown: true },
                  //   list: { inDropdown: true },
                  //   textAlign: { inDropdown: true },
                  //   link: { inDropdown: true },
                  //   history: { inDropdown: true },
                  //   image: {
                  //     uploadCallback: uploadImageCallBack,
                  //     alt: { present: true, mandatory: true },
                  //   },
                  // }}
                />,
              )}
            </Form.Item>
          </Row>
          <Row col={24}>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Row>
                <Col
                  style={{
                    marginTop: 26,
                  }}
                  span={23}
                >
                  <div style={{ textAlign: 'center', paddingTop: 10 }}>
                    <Button type="primary" style={{ marginRight: 20 }}>
                      确定
                    </Button>

                    <Button
                      type="cancel"
                      onClick={() =>
                        props.history.goBack()
                      }
                    >
                      取消
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </Card>
  );
});

export default NewMedia;
