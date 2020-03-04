import React, { useState, useEffect } from 'react'
import MarketDetail from './../../components/Detail';
import { detailData } from './data';


// 函数组件
const ServiceProviderDetail = (props) => {
    const routerState = props.history.location.state
    const companyId =  routerState ? routerState.companyId : ''
    console.log(companyId)

    return (
        <MarketDetail
            title={'服务商一级详情'}
            detailData={detailData}    
        >
        </MarketDetail>

    )
};


export default ServiceProviderDetail;