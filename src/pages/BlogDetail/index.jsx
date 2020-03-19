import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '@/components/CodeBlock/index';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
      title: '',
    }
  }

  componentDidMount() {
    const href = window.location.href.split('id=')[1]
    this.props.dispatch({
      type: 'blog/queryGetBlogDetail',
      payload: { _id: href },
    }).then(() => {
      const { success, data } = this.props.blogDetail
      if (success) {
        const { title, text } = data
        this.setState({ title, text, loading: false })
      }
    })
  }

  render() {
    const { text, title, loading } = this.state
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.blogCont}>
          <div className={styles.toBack}>
            <Button onClick={
              () => router.push('/blog-enjoy')
            }><Icon type="left" /> 返回列表</Button>
          </div>
          <div className={styles.info}>
            <div>{title}</div>
          </div>
          <div className={styles.markd}>
            <ReactMarkdown
              source={text}
              escapeHtml={false}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </div>
      </div> : <BlockLoading loading={loading} />
    );
  }
};

export default connect(({ blog }) => ({
  blogDetail: blog.blogDetail
}))(BlogDetail);