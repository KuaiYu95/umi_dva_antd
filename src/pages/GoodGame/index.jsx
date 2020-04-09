import React from 'react';
import { Empty } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.goodGame}>
      <div>
        <iframe src="http://www.kuaiyu.site:81/net-draw.html" frameBorder="0"></iframe>
      </div>
      <div>
        <iframe src="http://www.kuaiyu.site:81/google-photo.html" frameBorder=""></iframe>
      </div>
      <div style={{ paddingTop: 100}}>
        <Empty />
      </div>
      <div style={{ paddingTop: 100}}>
        <Empty />
      </div>
      <div style={{ paddingTop: 100}}>
        <Empty />
      </div>
      <div style={{ paddingTop: 100}}>
        <Empty />
      </div>
    </div>
  );
};
