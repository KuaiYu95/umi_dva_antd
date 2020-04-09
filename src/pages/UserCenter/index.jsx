import React from 'react';
import { Spin, Avatar, Icon, Divider, Tag, Empty } from 'antd';
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
    const avatar = 'http://www.kuaiyu.site:81/photo/me/me.jpg'
    const info = [
      {
        icon: 'wechat',
        content: 'mywx_ky（备注：博客）',
      }, {
        icon: 'mail',
        content: 'ky.kyy@qq.com',
      }, {
        icon: 'chrome',
        content: 'http://www.kuaiyu.site',
      }, {
        icon: 'github',
        content: 'https://github.com/KuaiYu95',
      }, {
        icon: 'cluster',
        content: '远途互联－数据中心－web开发组',
      }, {
        icon: 'home',
        content: '浙江省杭州市西湖区',
      }, 
    ]
    const tag = [
      '有追求',
      '搬砖',
      '宅',
      '电影',
      '火锅',
      'lol',
      '羽毛球',
      'B 站',
      '手游',
      'h5',
      'js',
      'umi + dva',
      'react + redux',
      'taro',
      'mini-program',
      'ES6+',
      'ts',
      'nodejs',
      'mongodb',
      'linux',
      '...'
    ]
    return (
      !loading ? <div className={styles.userCenter} style={{ padding: '24px 0' }}>
        <div className={styles.info}>
          <Avatar size={128} src={avatar} />
          <div className={styles.name}>蒯煜</div>
          <div className={styles.summary}>一个有追求的前端开发工程师</div>
          <Divider />
          <div className={styles.record}>
            {info.map(it => {
              return <div className={styles.infoItem} key={it.icon}>
                <Icon type={it.icon} /> <span>{it.content}</span>
              </div>
            })}
          </div>
          <Divider />
          <div className={styles.label}>
            标签： {tag.map((it, idx) => {
              return <Tag key={idx} className={styles.tag} color="#0D0806">{it}</Tag>
            })}
          </div>
        </div>
        <div className={styles.experience}>
          <Empty />
        </div>
      </div> : <Spin spinning={loading} size="large" />
    )
  }
}