import React from 'react';
import styles from './index.less';

function Money() {
  return <div className={styles.moneyCont} style={{ padding: 24, margin: '24px 0' }}>
    <div className={styles.alipay}>
      <img src="https://github.com/KuaiYu95/pictures/blob/master/money/zfb.jpg" alt="alipay" />
    </div>
    <div className={styles.wxpay}>
      <img src="https://github.com/KuaiYu95/pictures/blob/master/money/wx.jpg" alt="wxpay" />
    </div>
  </div>
}

export default Money