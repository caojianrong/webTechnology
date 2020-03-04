import React, { useState, useEffect } from 'react'
import { Table, Form, Row, Col, Input, Button, Icon, Select, DatePicker } from '@/components';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import styles from './index.module.scss';
import moment from 'moment';

// 列表页面组件
const MarketList = (props) => {
    const { title, formData, columns, tableData, form, onSearch, search , rowKey} = props
    const { getFieldDecorator } = form;

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // console.log(search);
    // 清空搜索数据
    const handleReset = () => {
        form.resetFields();
    };
    // 搜索
    const handleSearch = e => {
        e.preventDefault();
        form.validateFields((err, values) => {          
            Object.keys(values).map((key)=>{
                // 表单值未定义处理
                values[key] = values[key] ? values[key] : '';
                // 表单值是时间moment格式处理
                values[key] = values[key]._isAMomentObject 
                ? moment(values[key]).format("YYYY-MM-DD HH:mm:ss") 
                : values[key]
            })
            onSearch({ ...values, page, pageSize });
        });
    };
    // 分页配置
    let paginationConfig = {
        total: 500,
        showSizeChanger: true,
        pageSizeOptions: ['10', '50', '100'],
        // 集合中可以添加方法！！！（箭头函数好使，普通函数不起作用？）
        showTotal: total => `共 ${total} 条`,
        onChange: onChange,
        onShowSizeChange: onShowSizeChange,
        showQuickJumper: true
    }
    // 改变页码
    function onChange(page, pageSize) {
        setPage(page);
        setPageSize(pageSize);
        onSearch({ ...search, page, pageSize });
    }
    // 改变分页数
    function onShowSizeChange(page, pageSize) {
        setPage(page);
        setPageSize(pageSize);
        onSearch({ ...search, page, pageSize });
    }
    // 表单item获取
    const getItem = (child) => {
        // select
        if (child.status == 1) {
            return (
                getFieldDecorator(child.value, { initialValue: ''})(
                    <Select placeholder="请选择" >
                        {
                            child.options.map((option, i) =>
                                <Select.Option key={i} value={option.value}>{option.name}</Select.Option>
                            )
                        }
                    </Select>
                )
            );
        }
        // date
        else if (child.status == 2) {
            return (
                getFieldDecorator(child.value)(
                    <DatePicker showTime placeholder="Select Time" ></DatePicker>
                )
            );
        }
        // input
        else {
            return (
                getFieldDecorator(child.value,{ initialValue: ''})(<Input placeholder="" />)
            );
        }
    };

    return (

        <div className={commomStyles.IceContainer}>
            <PageTitle title={title} />

            <Form wrapperCol={{ span: 15 }} className={styles.searchform} onSubmit={handleSearch}>
                <Row gutter={24}>
                    {
                        formData.map((child, index) =>
                            <Col span={6} key={index} >
                                <Form.Item label={child.name} className={styles.formitem}>
                                    {getItem(child)}
                                </Form.Item>
                            </Col>
                        )
                    }
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                            清除
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table className={styles.table} pagination={paginationConfig} rowKey={rowKey} columns={columns.map(item => ({ ...item, ellipsis: true }))} dataSource={tableData} scroll={{ x: 1300 }} />

        </div>
    )
};


export default Form.create()(MarketList);