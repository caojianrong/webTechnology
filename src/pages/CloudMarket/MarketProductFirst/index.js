
import React, { useState, useEffect } from 'react'
import MarketList from './../components/List';
import request from '@/utils/request.js';
import axios from 'axios';

import { tabledata, formdata, columns} from './data'

// 函数组件
const MarketProductFirst = () => {

    const [tableData, setTableData] = useState(tabledata);
    const [searchData, setSearchData] = useState({});

    const onSearchService = (search) => {
        setTableData([]);
        setSearchData(search)
        console.log(search)
       
    };

    return (
        <MarketList
            title={"产品一级管理"}
            formData={formdata}
            columns={columns}
            tableData={tableData}
            onSearch={onSearchService}
            search={searchData}
            rowKey={'productId'}
            >
        </MarketList>
    )
};


export default MarketProductFirst;