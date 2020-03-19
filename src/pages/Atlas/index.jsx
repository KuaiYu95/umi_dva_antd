import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Empty } from 'antd';
import styles from './index.less';

export default class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Empty />
        <BlockLoading loading={loading} />
      </div>
    )
  }
}