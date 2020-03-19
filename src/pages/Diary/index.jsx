import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

export default class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  render() {
    let { loading } = this.state
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    )
  }
}