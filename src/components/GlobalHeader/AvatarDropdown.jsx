import { Avatar } from 'antd';
import React from 'react';
import styles from './index.less';

class AvatarDropdown extends React.Component {

  render() {
    return (
      <>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src='https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/1ed3f5200d86aeea49d5ef09bbc33979-32-32.png' alt="avatar" />
          <span className={styles.name}>蒯煜</span>
        </span>
      </>
    )
  }
}

export default AvatarDropdown
