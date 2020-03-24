import { Avatar } from 'antd';
import React from 'react';
import styles from './index.less';

class AvatarDropdown extends React.Component {

  render() {
    return (
      <a className={styles.myInfo} href="https://github.com/KuaiYu95">
        Github
      </a>
    )
  }
}

export default AvatarDropdown
