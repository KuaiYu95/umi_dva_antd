import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Descriptions, Avatar, BackTop, message, Tag, Modal, Divider, Affix } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '@/components/CodeBlock/index';
import Money from '@/components/Money/index';
import CommentTextArea from '@/components/Comment/index';
import CommentList from '@/components/Comment/list';
import { Link } from 'umi';
import router from 'umi/router';
import { connect } from 'dva';
import util from '@/utils/utils';
import styles from './index.less';

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingComment: true,
      text: '',
      _id: '',
      title: '',
      commentCount: 0,
      likeCount: 0,
      viewCount: 0,
      downloadCount: 0,
      typeIds: [],
      blogList: [],
      commentList: [],
    }
  }

  componentDidMount() {
    const { id } = util.query()
    this.getBlogDetail(id)
    this.getBlogComment(id)
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'blog/setTitle',
      data: ''
    })
  }

  getBlogDetail(id) {
    this.setState({ loading: true }, () => {
      this.props.dispatch({
        type: 'blog/queryGetBlogDetail',
        payload: { _id: id },
      }).then(() => {
        const { success, data } = this.props.blogDetail
        if (success) {
          this.setState({ ...data, loading: false }, () => {
            this.addView(id)
          })
          this.props.dispatch({
            type: 'blog/queryGetBlog',
            payload: { currentPage: 1, pageSize: 15, searchSort: 0, searchValue: '', searchType: '', type: data.typeIds, id },
          }).then(() => {
            if (this.props.blogLists.success) {
              this.setState({ blogList: this.props.blogLists.data })
            }
          })
        }
      })
    })
  }

  getBlogComment(id) {
    this.setState({ loadingComment: true }, () => {
      this.props.dispatch({
        type: 'comment/queryGetComment',
        payload: { blogId: id }
      }).then(() => {
        const { success, data } = this.props.commentList
        if (success) {
          this.setState({ commentList: data, loadingComment: false })
        }
      })
    })
  }

  showDeleteConfirm = (id, title) => Modal.confirm({
    title: '确定要删除这条博客吗？',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk: () => {
      this.props.dispatch({
        type: 'blog/queryDelBlog',
        payload: { id }
      }).then(() => {
        message.success(`博客：${title} 已删除`)
        return router.push('/blog-enjoy')
      })
    }
  })

  isComment = comment => {
    const time = new Date().getTime()
    const { _id, commentList } = this.state
    const data = { comment, time, blogId: _id, likeCount: 0 }
    this.props.dispatch({
      type: 'comment/queryAddComment',
      payload: data
    }).then(() => {
      message.success('发表成功')
      commentList.unshift(this.props.commentInfo.data)
      this.setState({ commentList })
    })
  }

  download = item => {
    const { _id, title, text, downloadCount } = item
    const flag = util.localSchema('blogDownloadSchema', _id)
    util.download(title, text)
    if (flag) {
      return
    }
    this.props.dispatch({
      type: 'blog/queryBlogDownload',
      payload: { _id }
    }).then(() => {
      this.setState({ downloadCount: downloadCount + 1 })
    })
  }

  handleClickLike(_id) {
    const { likeCount } = this.state
    const flag = util.localSchema('blogLikeSchema', _id)
    if (flag) {
      this.props.dispatch({
        type: 'blog/queryDecBlogLike',
        payload: { _id }
      }).then(() => {
        this.setState({ likeCount: likeCount - 1})
      })
      return
    }
    this.props.dispatch({
      type: 'blog/queryAddBlogLike',
      payload: { _id }
    }).then(() => {
      this.setState({ likeCount: likeCount + 1})
    })
  }

  addView(id) {
    if (util.localSchema('blogViewSchema', id)) {
      return
    }
    this.props.dispatch({
      type: 'blog/queryAddBlogView',
      payload: { _id: id }
    }).then(() => {
      const { data } = this.props.blogDetail
      this.setState({ ...data })
    })
  }

  toOtherBlog(id) {
    const { _id } = this.state
    if (_id !== id) {
      this.getBlogDetail(id)
    }
  }

  render() {
    const { text, loading, commentCount, likeCount, viewCount, downloadCount, _id, title, typeIds, blogList, commentList, loadingComment } = this.state
    const renderHeader = t => (
      <div className={styles.avatarUser}>
        <Avatar size="small" src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/5b019b627dcc672321b168667d7337e0-88-88.gif" />
        <span className={styles.username}>{t}</span>
      </div>
    )
    const tagsBgc = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
    const blogDownloadSchema = localStorage.getItem('blogDownloadSchema') || []
    const blogViewSchema = localStorage.getItem('blogViewSchema') || []
    const blogLikeSchema = localStorage.getItem('blogLikeSchema') || []
    return (
      !loading ? <div className={styles.blog} id="blog" style={{ padding: '24px 0' }}>
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
          <Money />
          <div id="comment" style={{ backgroundColor: '#fff', padding: 24 }}>
            <CommentTextArea isComment={comment => this.isComment(comment)} />
            <CommentList loading={loadingComment} data={commentList} />
          </div>
        </div>
        <Affix offsetTop={89}>
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
                <Button type="primary" size="small" className={styles.btnItem} onClick={
                  () => this.download({ title, text, _id, downloadCount })
                }><Icon type="save" /> 下载</Button>
                <Button type="danger" size="small" className={styles.btnItem} onClick={
                  () => {
                    this.showDeleteConfirm(_id, title)
                  }
                }><Icon type="delete" /> 删除</Button>
              </div>
            </div>
            <div className={styles.blogerInfo}>
              <Descriptions title={renderHeader('数据概览')} column={2} size="small">
                <Descriptions.Item label={
                  <span className="cursor" onClick={() => this.handleClickLike(_id)}>
                    {blogLikeSchema.includes(_id) ? <Icon type="fire" theme="filled" /> : <Icon type="fire" />} 点赞
                  </span>
                }>{likeCount}</Descriptions.Item>
                <Descriptions.Item label={
                  <a href="#comment"><Icon type="message" /> 评论</a>
                }>{commentCount}</Descriptions.Item>
                <Descriptions.Item label={
                  <span>
                    {blogViewSchema.includes(_id) ? <Icon type="eye" theme="filled" /> : <Icon type="eye" />} 查看
                  </span>
                }>{viewCount}</Descriptions.Item>
                <Descriptions.Item label={
                  <span className="cursor" onClick={() => this.download({ title, text, _id, downloadCount })}>
                    {blogDownloadSchema.includes(_id) ? <Icon type="file-markdown" theme="filled" /> : <Icon type="file-markdown" />} 下载
                  </span>
                }>{downloadCount}</Descriptions.Item>
                {/* <Descriptions.Item label={<Icon type="star" />}>{collectCount}</Descriptions.Item> */}
              </Descriptions>
            </div>
            {blogList.length > 0 && <div className={styles.blogList}>
              {renderHeader('相关推送')}
              <div className={styles.blogItem}>
                {blogList.map(item => <div key={item._id} onClick={() => this.toOtherBlog(item._id)}>
                  <Icon type="link" />
                  <span><Link to={`/blog-enjoy/blog-detail?id=${item._id}`}>{item.title}</Link></span>
                </div>
                )}
              </div>
            </div>}
          </div>
        </Affix>
        <BackTop style={{ right: 50 }}>
          <div className={styles.backTop}>
            <Icon type="caret-up" />
            UP
          </div>
        </BackTop>
      </div> : <BlockLoading loading={loading} />
    );
  }
};

export default connect(({ blog, comment }) => ({
  blogDetail: blog.blogDetail,
  blogLists: blog.blogLists,
  commentList: comment.commentList,
  commentInfo: comment.commentInfo
}))(BlogDetail);