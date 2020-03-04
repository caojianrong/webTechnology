import React from 'react';
import commomStyles from '@/common/index.module.less';

const pageTitle = props => {
  const {ButtonGroup, title} = props;
  return (
    <div className={commomStyles.spaceBetween}>
      <div>
        <h5 className={commomStyles.title}>{title}</h5>
      </div>
      <div>
        {ButtonGroup || null}
      </div>
    </div>
  );
};
export default pageTitle;

