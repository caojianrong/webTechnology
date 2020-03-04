import React, { useState } from 'react';
import { Icon, Table, Select, Input, Tag, Button } from '@/components';
import styles from './index.module.less';
import { data } from './data';

const columns = [
  {
    title: '属性名称',
    dataIndex: 'attributeName',
    editable: true,
  },
  {
    title: '属性类型',
    dataIndex: 'attributeType',
  },
  {
    title: '属性单位',
    dataIndex: 'attributeUnit',
  },
  {
    title: '是否计费',
    dataIndex: 'isCale',
  },
  {
    title: '是否展示',
    dataIndex: 'isShow',
  },
  {
    title: '属性值',
    dataIndex: 'attributeValue',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) =>
      data.length >= 1 ? (
        <span>
          <a>删除</a>
        </span>
      ) : null,
  },
];

const addAttribute = [
  {
    key: '2',
    attributeName: (
      <div className={styles.attributeComponent}>
        <Select className={styles.selectStyle} defaultValue="0">
          <Select.Option value="0">CPU</Select.Option>
          <Select.Option value="1">内存</Select.Option>
        </Select>
      </div>
    ),
    attributeType: (
      <div className={styles.attributeComponent}>
        <Select className={styles.selectStyle} defaultValue="0">
          <Select.Option value="0">枚举</Select.Option>
          <Select.Option value="1">阶梯</Select.Option>
        </Select>
      </div>
    ),
    attributeUnit: (
      <div className={styles.attributeComponent}>
        <Select className={styles.selectStyle} defaultValue="0">
          <Select.Option value="0">核</Select.Option>
          <Select.Option value="1">GB</Select.Option>
        </Select>
      </div>
    ),
    isCale: (
      <div className={styles.attributeComponent}>
        <Select className={styles.selectStyle} defaultValue="0">
          <Select.Option value="0">是</Select.Option>
          <Select.Option value="1">否</Select.Option>
        </Select>
      </div>
    ),
    isShow: (
      <div className={styles.attributeComponent}>
        <Select className={styles.selectStyle} defaultValue="0">
          <Select.Option value="0">是</Select.Option>
          <Select.Option value="1">否</Select.Option>
        </Select>
      </div>
    ),
    attributeValue: (
      <div className={styles.attributeComponent}>
        <div className={styles.attributeInput}>
          <Input placeholder="输入属性值" className={styles.selectStyle} />
          <Button className={styles.addButton} type="primary">
            添加
          </Button>
        </div>
        <div className={styles.tagBox}>
          <Tag className={styles.tag} closable>
            Tag 1
          </Tag>
        </div>
      </div>
    ),
  },
];

const AddAttribute = () => {
  const [ndata, setNData] = useState(data);

  return (
    <div className={styles.attributeWrapper}>
      <div>
        <Table columns={columns} dataSource={addAttribute} pagination={false} />
      </div>
      <div className={styles.addAttribute}>
        <Icon type="plus" />
        <span className={styles.btnText}>新增属性</span>
      </div>
    </div>
  );
};
export default AddAttribute;
