import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Tag, Divider, Pagination, Input, Select, message, Empty } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import router from 'umi/router';
import util from '@/utils/utils.js';
import moment from 'moment';
import styles from './index.less';

const { Option } = Select
const { Search } = Input;
class BlogEnjoy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 20,
      searchSort: '0',
      searchValue: '',
      searchType: '',
      loading: true,
      totalItems: 0,
      blogList: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { currentPage, pageSize, searchSort, searchValue, searchType } = this.state
    this.props.dispatch({
      type: 'blog/queryGetBlog',
      payload: { currentPage, pageSize, searchSort, searchValue, searchType },
    }).then(() => {
      const { success, data, totalItems } = this.props.blogLists
      if (success) {
        this.setState({ blogList: data, totalItems, loading: false })
      }
    })
  }

  onChange = (page, pageSize) => {
    this.setState({ currentPage: page, pageSize }, () => {
      this.getData()
    })
  }

  onSearch = value => {
    this.setState({ searchValue: value }, () => {
      this.getData()
    })
  }

  handleSelectSort = value => {
    this.setState({ searchType: value }, () => {
      this.getData()
    })
  }

  handleSearchSort = value => {
    this.setState({ searchSort: value }, () => {
      this.getData()
    })
  }

  toBlogDetail(_id) {
    if (util.localSchema('blogViewSchema', _id)) {
      return 
    }
    this.props.dispatch({
      type: 'blog/queryAddBlogView',
      payload: { _id }
    }).finally(() => {
      router.push(`/blog-enjoy/blog-detail?id=${_id}`);
    })
  }

  updateCount(_id, update, type) {
    const list = []
    this.state.blogList.forEach(it => {
      if (it._id === _id) {
        list.push({ ...it, [type]: it[type] + update })
      } else {
        list.push(it)
      }
    })
    this.setState({ blogList: list })
  }

  handleClickLike(_id) {
    const flag = util.localSchema('blogLikeSchema', _id)
    if (flag) {
      this.props.dispatch({
        type: 'blog/queryDecBlogLike',
        payload: { _id }
      }).then(() => {
        this.updateCount(_id, -1, 'likeCount')
      })
      return 
    }
    this.props.dispatch({
      type: 'blog/queryAddBlogLike',
      payload: { _id }
    }).then(() => {
      this.updateCount(_id, 1, 'likeCount')
    })
  }

  download = item => {
    const { _id, title, text } = item
    const flag = util.localSchema('blogDownloadSchema', _id)
    util.download(title, text)
    if (flag) {
      return 
    }
    this.props.dispatch({
      type: 'blog/queryBlogDownload',
      payload: { _id }
    }).then(() => {
      this.updateCount(_id, 1, 'downloadCount')
    })
  }

  render() {
    const { loading, totalItems, searchSort, pageSize, blogList } = this.state
    const blogDownloadSchema = localStorage.getItem('blogDownloadSchema')
    const blogViewSchema = localStorage.getItem('blogViewSchema')
    const blogLikeSchema = localStorage.getItem('blogLikeSchema')
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.tabLine}>
          <Link className={styles.link} to='/blog-enjoy/post-blog'><Button type="primary">发布博客 <Icon type="right" /></Button></Link>
          <Search placeholder="搜索" onSearch={this.onSearch} />
          <Select className={styles.selectSort} defaultValue={searchSort} onChange={this.handleSearchSort}>
            <Option value="0">最近更新 </Option>
            <Option value="3">最多查看 </Option>
            <Option value="1">最多评论 </Option>
            <Option value="2">最多点赞 </Option>
            <Option value="4">最多下载 </Option>
          </Select>
        </div>
        {(blogList.length > 0 ? blogList.map(item => {
          const isUploadTime = item.uploadTime === item.lastModifyTime
          const time = moment(+item.lastModifyTime).format('YYYY-MM-DD kk:mm:ss')
          return <div className={styles.blogContain} style={{ margin: '16px auto 0' }} key={item._id}>
            <div className={styles.blogHeader}>
              <Link to={`/blog-enjoy/blog-detail?id=${item._id}`}>
                <div className={styles.blogTitle} onClick={() => this.toBlogDetail(item._id)}>{item.title}</div>
              </Link>
              <div className={styles.blogTags}>
                {item.typeIds.map(it => it ? <span className={styles.blogTagsItem} key={it}><Tag color="#0D0806">{it}</Tag></span> : null)}
              </div>
            </div>
            <div className={styles.blogContent}>{item.text}</div>
            <div className={styles.blogFooter}>
              <div className={styles.blogStatistic}>
                <span onClick={() => this.handleClickLike(item._id)}>
                  {blogLikeSchema.includes(item._id) ? <Icon type="fire" theme="filled" /> : <Icon type="fire" />}
                  <span className={styles.count}>{item.likeCount || 0}</span>
                </span>
                <Divider type="vertical" />
                <span onClick={() => router.push(`/blog-enjoy/blog-detail?id=${item._id}`)}>
                  <Icon type="message" />
                  <span className={styles.count}>{item.commentCount || 0}</span>
                </span>
                <Divider type="vertical" />
                <span onClick={() => this.download(item)}>
                  {blogDownloadSchema.includes(item._id) ? <Icon type="save" theme="filled" /> : <Icon type="save" />}
                  <span className={styles.count}>{item.downloadCount || 0}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  {blogViewSchema.includes(item._id) ? <Icon type="eye" theme="filled" /> : <Icon type="eye" />}
                  <span className={styles.count}>{item.viewCount}</span>
                </span>
                <Divider type="vertical" />
                <span onClick={() => { message.info('请按 Ctrl+D 或者 Command+D 手动收藏!') }}>
                  <Icon type="star" />
                </span>
              </div>
              <div className={styles.blogTimestamp}>
                <Tag color="#0D0806" style={{ color: '#fff' }}>
                  {isUploadTime ? '发布时间：' : '最后更新时间：'}<Icon type="clock-circle" /> {time}
                </Tag>
              </div>
            </div>
          </div>
        }) : <Empty description="暂无数据" style={{ marginTop: '20vh' }} />)}
        {blogList.length > 0 && <Pagination
          showQuickJumper
          pageSize={pageSize}
          onChange={this.onChange}
          defaultCurrent={1}
          total={totalItems}
          showTotal={total => `共计 ${total} 条`}
          style={{ textAlign: 'right', margin: '24px auto' }}
        />}
      </div> : <BlockLoading loading={loading} />
    )
  }
}

export default connect(({ blog }) => ({
  blogLists: blog.blogLists,
}))(BlogEnjoy);