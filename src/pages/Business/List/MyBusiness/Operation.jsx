import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@/components';

const Operation = props => {
  switch (props.businessStatus) {
    case '商机发布':
    case '合同签署':
    case '已中标':
      return (
        <span>
          <Link to="">商机拜访</Link>
          <Divider type="vertical" />
          <Link to="">详情</Link>
        </span>
      );
    case '初审转意向':
    case '评审转意向':
      return (
        <span>
          <Link to="">商机拜访</Link>
          <Divider type="vertical" />
          <Link to="">商机状态变更</Link>
          <Divider type="vertical" />
          <Link to="">详情</Link>
        </span>
      );
    case '未通过商机评审':
      return (
        <span>
          <Link to="">商机拜访</Link>
          <Divider type="vertical" />
          <Link to="">商机状态变更</Link>
          <Divider type="vertical" />
          <Link to="">修改</Link>
          <Divider type="vertical" />
          <Link to="">详情</Link>
        </span>
      );
    case '商机流失':
      return (
        <span>
          <Link to="">商机拜访</Link>
          <Divider type="vertical" />
          <Link to="">修改</Link>
          <Divider type="vertical" />
          <Link to="">详情</Link>
        </span>
      );
    default:
      return (
        <span>
          <Link to="">商机拜访</Link>
          <Divider type="vertical" />
          <Link to="">商机状态变更</Link>
          <Divider type="vertical" />
          <Link to="">修改</Link>
          <Divider type="vertical" />
          <Link to="">详情</Link>
        </span>
      );
  }
};
export default Operation;
