import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Descriptions, Avatar, BackTop, message, Tag } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '@/components/CodeBlock/index';
import { Link } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
      _id: '',
      title: '',
      commentCount: 0,
      likeCount: 0,
      collectCount: 0,
      viewCount: 0,
      typeIds: [],
      blogList: []
    }
  }

  componentDidMount() {
    const id = window.location.href.split('id=')[1]
    this.setState({ loading: true }, () => {
      this.props.dispatch({
        type: 'blog/queryGetBlogDetail',
        payload: { _id: id },
      }).then(() => {
        const { success, data } = this.props.blogDetail
        if (success) {
          const { text, commentCount, likeCount, collectCount, viewCount, _id, title, typeIds } = data
          this.setState({ text, loading: false, commentCount, likeCount, collectCount, viewCount, _id, title, typeIds })
          this.props.dispatch({
            type: 'blog/queryGetBlog',
            payload: { currentPage: 1, pageSize: 20, searchSort: 0, searchValue: '', searchType: '', type: typeIds },
          }).then(() => {
            if (this.props.blogLists.success) {
              this.setState({ blogList: this.props.blogLists.data })
            }
          })
        }
      })
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'blog/setTitle',
      data: ''
    })
  }

  render() {
    const { text, loading, commentCount, likeCount, collectCount, viewCount, _id, title, typeIds, blogList } = this.state
    const renderHeader = (t) => (
      <div className={styles.avatarUser}>
        <Avatar size="small" src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/5b019b627dcc672321b168667d7337e0-88-88.gif" />
        <span className={styles.username}>{t}</span>
      </div>
    )
    const tagsBgc = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.blogCont}>
          <div className={styles.tags}>
            <span>标签：</span>
            {typeIds.length > 0 && typeIds.map((item, idx) => <span key={item}>
              <Tag color={tagsBgc[idx % 11]}>{item}</Tag>
            </span>)}
          </div>
          <div className={styles.markd}>
            <ReactMarkdown
              source={text}
              escapeHtml={false}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.funcInfo}>
            <div className={styles.btns}>
              <Button type="link" size="small" className={styles.btnItem} onClick={
                () => router.push('/blog-enjoy')
              }><Icon type="left" /> 返回</Button>
              <Link to={`/blog-enjoy/blog-edit?id=${_id}`}>
                <Button type="primary" size="small" className={styles.btnItem}>
                  <Icon type="edit" /> 编辑
                </Button>
              </Link>
              <Button type="danger" size="small" className={styles.btnItem} onClick={
                () => {
                  this.props.dispatch({
                    type: 'blog/queryDelBlog',
                    payload: { _id }
                  }).then(() => {
                    message.success(`博客：${title} 已删除`)
                    return router.push('/blog-enjoy')
                  })
                }
              }><Icon type="delete" /> 删除</Button>
              <Button type="link" size="small" className={styles.btnItem} onClick={
                () => this.componentDidMount()
              }><Icon type="redo" /> 刷新</Button>
            </div>
          </div>
          <div className={styles.blogerInfo}>
            <Descriptions title={renderHeader('野心啵啵')} column={2} size="small">
              <Descriptions.Item label={<Icon type="like" />}>{likeCount}</Descriptions.Item>
              <Descriptions.Item label={<Icon type="message" />}>{commentCount}</Descriptions.Item>
              <Descriptions.Item label={<Icon type="star" />}>{collectCount}</Descriptions.Item>
              <Descriptions.Item label={<Icon type="eye" />}>{viewCount}</Descriptions.Item>
              {/* <Descriptions.Item label={<Icon type="download" />}>{}</Descriptions.Item> */}
            </Descriptions>
          </div>
          {blogList.length > 0 && <div className={styles.blogList}>
            {renderHeader('相关推送')}
            <div className={styles.blogItem}>
              {blogList.map(item => {
                return <div>
                  <Icon type="link" /> 
                  <span><Link to={`/blog-enjoy/blog-detail?id=${item._id}`}>{item.title}</Link></span>
                </div>
              })}
            </div>
          </div>}
        </div>
        <BackTop>
          <div className={styles.backTop}>
            <Icon type="caret-up" />
            UP
          </div>
        </BackTop>
      </div> : <BlockLoading loading={loading} />
    );
  }
};

export default connect(({ blog }) => ({
  blogDetail: blog.blogDetail,
  blogLists: blog.blogLists
}))(BlogDetail);