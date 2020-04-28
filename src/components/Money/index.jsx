import React from 'react';
import styles from './index.less';

function Money() {
  const alipay = 'http://www.kuaiyu.site:81/photo/money/alipay.jpg'
  const wxpay = 'http://www.kuaiyu.site:81/photo/money/wxpay.jpg'
  return <div className={styles.moneyCont} style={{ padding: 12, margin: '24px 0' }}>
    <div className={styles.show}>打赏</div>
    <div className={styles.alipay}>
      <img src={alipay} alt="alipay" />
      <div>支付宝</div>
    </div>
    <div className={styles.wxpay}>
      <img src={wxpay} alt="wxpay" />
      <div>微信</div>
    </div>
  </div>
}

export default Money