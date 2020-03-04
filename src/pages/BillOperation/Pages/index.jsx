import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { request } from '@wocloud/utils';
import commomStyles from '@/common/index.module.scss';
import routes from '@/config/routes';

export default function Pages(props) {
  // console.log('routes', routes)
  // console.log('props', props)
  const data = routes[0] || {};
  const goto = (path) => {
  const { history: { push } } = props;
    console.log(path)
    push(path)
  }

  return (
    <div className={commomStyles.IceContainer}>
      {
        data.routes.map(({ path }) => {
          return <div onClick={()=>goto(path)}>
            {path}
          </div>
        })
      }
    </div>
  );
}

