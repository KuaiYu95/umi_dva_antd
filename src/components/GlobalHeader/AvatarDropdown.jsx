import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Icon } from 'antd';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.updateTime()
    }, 1000);
  }

  updateTime() {
    const time = moment().format('YYYY-MM-DD kk:mm:ss')
      this.setState({ time })
  }

  render() {
    const { blogTitle } = this.props
    const { time } = this.state
    return (
      <div className={styles.myInfo}>
        {blogTitle && <div className={styles.blogTitle}> 🌲 {blogTitle} 🌲 </div>}
        {time && <div className={styles.time}>{time}</div>}
        <div className={styles.github}>
          <a href="https://github.com/juanjuanya">Github</a>
        </div>
      </div>
    )
  }
}

export default connect(({ blog }) => ({
  blogTitle: blog.blogTitle,
}))(AvatarDropdown);
