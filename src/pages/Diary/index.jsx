import React from 'react';
import { Spin, Empty } from 'antd';
import styles from './index.less';

export default class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    let { loading } = this.state
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Empty />
        <Spin spinning={loading} size="large" />
      </div>
    )
  }
}