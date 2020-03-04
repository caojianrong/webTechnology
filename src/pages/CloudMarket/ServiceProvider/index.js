import React, { useState, useEffect } from 'react'
import MarketList from './../components/List';
import request from '@/utils/request.js';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { tabledata, formdata, getStatus } from './data'
import { getNowFormatDate } from '@/utils/date';

// 函数组件
const ServiceProvider = () => {
    const columns = [
        {
            title: '登录账号',
            dataIndex: 'loginName',
            width: 150,
        },
        {
            dataIndex: "mail",
            title: "电子邮件",
            width: 150,
        },
        {
            dataIndex: "telPhone",
            title: "移动电话",
            width: 150,
        },
        {
            dataIndex: "checkStatus",
            title: "状态",
            render: (text, record) => (
                <span>{getStatus(record)}</span>
            )
        },
        {
            dataIndex: "companyId",
            title: "企业id",
            width: 100,
        },
        {
            dataIndex: "companyName",
            title: "企业名称",
            width: 150,
        },
        {
            dataIndex: "companyOrgCode",
            title: "企业组织代码",
            width: 150,
        },
        {
            dataIndex: "createTime",
            title: "创建时间",
            width: 200,
            render: (text, record) => (
                <span>{getNowFormatDate(text)}</span>
            )

        },
        {
            title: '操作',
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <Link
                        to={{
                            pathname: '/market/service/list/detail',
                            state: {  // 页面跳转要传递的数据，如下
                                companyId: record.companyId,
                            },
                        }}
                    >详情
                    </Link>
                </span>
            )
        }
    ]
    
    // const [data, setData] = useState([]);
    //   const [loading, setLoading] = useState(false);
    //   const [error, setError] = useState(null);

    // const fetchData = async () => {
    //     //   setLoading(true);
    //     try {
    //         const result = await axios({
    //             method: 'post',
    //             url: '/public-bss/bss-rest/pr/facilitator/getCompanyList',
    //             // request body
    //             data: { ...searchData, page: "1", pageSize: "100" }
    //         });
    //         setData(result.data);
    //     } catch (err) {
    //         console.log('err'+ err);
    //         // setError(err);
    //     }
    //     //   setLoading(false);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);
    // 需要渲染的数据定义在state，其他数据不要定义在state，
    // 改变State中值后，值不会马上变化（异步），渲染后值会变
    const [tableData, setTableData] = useState(tabledata);
    const [searchData, setSearchData] = useState({});

    const onSearchService = (search) => {
        setTableData([]);
        setSearchData(search)
        console.log(search)
    };

    return (
        <MarketList
            title={"服务商查询"}
            formData={formdata}
            columns={columns}
            tableData={tableData}
            onSearch={onSearchService}
            search={searchData}
            rowKey={'loginUid'}
            >
        </MarketList>
    )
};


export default ServiceProvider;