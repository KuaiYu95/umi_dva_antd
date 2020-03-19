import React from 'react';
import { Spin } from 'antd';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={this.props.loading} size="large" />
      </div>
    )
  }
}