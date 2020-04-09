import React from 'react';
import { Spin, Empty } from 'antd';
import styles from './index.less';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <Empty />
      </div> : <Spin spinning={loading} size="large" />
    )
  }
}