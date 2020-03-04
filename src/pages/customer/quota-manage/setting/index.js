import React, {useState, useEffect} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form,Descriptions,Card ,Tabs} from '@wocloud/design';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.less';

const { TabPane } = Tabs;
const callback=(key) =>{
  console.log(key);
};
const data = [];
for (let i = 0; i < 130; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext();

const EditableCell  = props =>  {
  const getInput = () => {
    if (props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  const renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

    return <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>;

};

const EditableTable = props =>  {
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
    // this.state = { data, editingKey: '' };
    const columns = [
      {
        title: '数据中心',
        dataIndex: 'name',
        width: '15%',
        editable: true,
      },
      {
        title: '负载均衡(个 )',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: '公网ip（个）',
        dataIndex: 'address',
        width: '13%',
        editable: true,
      },
      {
        title: '路由（个）',
        dataIndex: 'address1',
        width: '13%',
        editable: true,
      },
      {
        title: '公网带宽（MB）',
        dataIndex: 'address2',
        width: '13%',
        editable: true,
      },
      {
        title: '镜像（GB）',
        dataIndex: 'address3',
        width: '13%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消吗?" onConfirm={() => cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => edit(record.key)}>
              编辑
            </a>
          );
        },
      },
    ];


  const isEditing = record => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save=(form, key)=> {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = data;
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setEditingKey('');
        setData(newData);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    });
  };

  const edit=(key) =>{
    setEditingKey(key);

  };

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns1 = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
  for (let i = 0; i < 130; i++) {
    data.push({
      key: i.toString(),
      name: `北京 ${i}`,
      age: 32,
      address: ` ${i}`,
      address1: `${i}`,
      address2: ` ${i}`,
      address3: ` ${i}`,
    });
  }

    console.log('columns',columns);
    console.log('columns1',columns1);
    console.log('data',data);

    return (
      <div className={commomStyles.IceContainer}>
        <div >
          <Descriptions title="客户信息">
            <Descriptions.Item label="客户名">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="登录账号：">1810000000</Descriptions.Item>
          </Descriptions>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="客户总配额" key="1">
            <EditableContext.Provider value={props.form}>

              <Table
                components={components}
                bordered
                dataSource={data}
                columns={columns1}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </EditableContext.Provider>
          </TabPane>
          <TabPane tab="区分域配额" key="2">
            <EditableContext.Provider value={props.form}>

              <Table
                components={components}
                bordered
                dataSource={data}
                columns={columns1}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </EditableContext.Provider>
          </TabPane>
        </Tabs>

        {/* <Card title="客户总配额" bordered={false} style={{ width: '90%' }}> */}
        {/*  <EditableContext.Provider value={props.form}> */}

        {/*    <Table */}
        {/*      components={components} */}
        {/*      bordered */}
        {/*      dataSource={data} */}
        {/*      columns={columns1} */}
        {/*      rowClassName="editable-row" */}
        {/*      pagination={{ */}
        {/*        onChange: cancel, */}
        {/*      }} */}
        {/*    /> */}
        {/*  </EditableContext.Provider> */}
        {/* </Card> */}
        {/* <Card title="区分域配额：" bordered={false} style={{ width: '90%' }}> */}
        {/*  <EditableContext.Provider value={props.form}> */}

        {/*    <Table */}
        {/*      components={components} */}
        {/*      bordered */}
        {/*      dataSource={data} */}
        {/*      columns={columns1} */}
        {/*      rowClassName="editable-row" */}
        {/*      pagination={{ */}
        {/*        onChange: cancel, */}
        {/*      }} */}
        {/*    /> */}
        {/*  </EditableContext.Provider> */}
        {/* </Card> */}
      </div>
    );
};

export default Form.create()(EditableTable);


