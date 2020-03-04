import React from 'react'
import MarketDetail from './../../components/Detail';
import { detailData } from './data';


// 函数组件
const MarketProductDetail = (props) => {
    const routerState = props.history.location.state
    const logId =  routerState ? routerState.logId : ''
    console.log(logId)

    return (
        <MarketDetail
            itemWidth={'100%'}
            title={'产品详情'}
            detailData={detailData}    
        >
        </MarketDetail>

    )
};


export default MarketProductDetail;