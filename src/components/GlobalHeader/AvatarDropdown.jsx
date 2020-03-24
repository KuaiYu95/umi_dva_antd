import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  

  render() {
    const { blogTitle } = this.props
    return (
      <div className={styles.myInfo}>
        <div className={styles.blogTitle}>{blogTitle}</div>
        <div className={styles.github}>
          <a href="https://github.com/KuaiYu95">Github</a>
        </div>
      </div>
    )
  }
}

export default connect(({ blog }) => ({
  blogTitle: blog.blogTitle,
}))(AvatarDropdown);
