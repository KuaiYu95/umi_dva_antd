import React from 'react';
import { Avatar, List, Icon } from 'antd';
import moment from 'moment';
import DefaultSettings from '../../../config/defaultSettings';
import styles from './index.less';
export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { data } = this.props
    return data.length > 0 ? <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <span><Icon type="fire" /> {item.likeCount}</span>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={32} style={{ backgroundColor: DefaultSettings.primaryColor }}>#{data.length - index - 1}</Avatar>}
              title={moment(+item.time).format('YYYY-MM-DD kk:mm:ss')}
              description={item.comment}
            />
          </List.Item>
        )}
      />
      <div className='text-align-center'><Icon type="frown" /> 没有更多数据了， 快来发表吧</div>
    </div> : <div className='text-align-center'>
      暂无数据，快来发表吧
    </div>
  }
}