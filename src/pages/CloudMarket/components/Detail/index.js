import React from 'react'
import {  Card } from '@/components';
import PageTitle from '@/components/PageTitle';
import commomStyles from '@/common/index.module.scss';
import styles from './index.module.scss';

// 详情页面
const MarketDetail = (props) => {

    const getImg = (url) => {
        const origin =
            location.hostname === "cucc.wocloud.cn"
                ? "https://cucc.wocloud.cn"
                // : "http://172.29.7.19:3008";
                : "http://172.29.7.13";
        return /^data:|http/.test(url) ? url : `${origin}${url}`;
    }

    const getItem = (item) => {
        // 网页
        if (item.status == 1) {
            return (
                <a href={"https://" + item.value} target="_blank">{item.value}</a>
            );
        }
        // 图片 
        else if (item.status == 2) {
            return (
                <a href={getImg(item.value)} target="_blank"><img src={getImg(item.value)} /></a>
            );
        } else {
            return (
                <span>{item.value}</span>
            );
        }
    };

    const { detailData, title, itemWidth } = props

    return (
        <div className={commomStyles.IceContainer}>
            <PageTitle title={title} />
            {
                detailData.map((detail, index) =>
                    <Card key={index} title={detail.title} className={styles.card} headStyle={{ background: '#1DA57A11' }}>
                        <div className={styles.cardbody}>
                            {
                                detail.items.map((item, i) =>
                                    <div key={i} className={styles.carditem} style={{ width: itemWidth }}>
                                        <label>{item.name}</label>{getItem(item)}
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                )
            }
        </div>
    )
};

export default MarketDetail;