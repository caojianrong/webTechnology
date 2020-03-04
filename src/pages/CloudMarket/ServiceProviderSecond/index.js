
import React, { useState, useEffect } from 'react'
import MarketList from './../components/List';
import { Link } from 'react-router-dom'
import { tabledata, formdata } from './data'

const columns = [
    {
        title: '登录账号',
        dataIndex: 'loginName'
    },
    {
        dataIndex: "mail",
        title: "电子邮件"
    },
    {
        dataIndex: "telPhone",
        title: "移动电话"
    },
    {
        dataIndex: "checkStatus",
        title: "状态"
    },
    {
        dataIndex: "companyId",
        title: "企业id"
    },
    {
        dataIndex: "companyName",
        title: "企业名称"
    },
    {
        dataIndex: "companyOrgCode",
        title: "企业组织代码"
    },
    {
        dataIndex: "createTime",
        title: "创建时间"
    },
    {
        title: '操作',
        render: (text, record) => (
            <span>
                <Link
                    to={{
                        pathname: '/market/service/seclist/detail',
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
const ServiceProviderSecond = () => {
    const [tableData, setTableData] = useState(tabledata);
    const [searchData, setSearchData] = useState({});

    const onSearchService = (search) => {
        setTableData([]);
        setSearchData(search);
        console.log(search)
    };

    return (
        <MarketList
            title={"服务商二级审批查询"}
            formData={formdata}
            columns={columns}
            tableData={tableData}
            onSearch={onSearchService}
            search={searchData}
            rowKey={'loginUid'}
        >
        </MarketList>
    )
}

export default ServiceProviderSecond;
