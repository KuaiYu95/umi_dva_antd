import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Tag, Divider, Pagination, Input, Select, message, Empty } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
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

  onSearch = (value) => {
    this.setState({ searchValue: value }, () => {
      this.getData()
    })
  }

  handleSelectSort = (value) => {
    this.setState({ searchType: value }, () => {
      this.getData()
    })
  }

  handleSearchSort = (value) => {
    this.setState({ searchSort: value }, () => {
      this.getData()
    })
  }

  render() {
    const { loading, totalItems, searchSort, pageSize, blogList } = this.state
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.tabLine}>
          <Link className={styles.link} to='/blog-enjoy/post-blog'><Button type="primary">发布博客 <Icon type="right" /></Button></Link>
          <Search placeholder="搜索" onSearch={this.onSearch} />
          <Select className={styles.selectSort} defaultValue={searchSort} onChange={this.handleSearchSort}>
            <Option value="0">最近更新 </Option>
            <Option value="2">最多点赞 </Option>
            <Option value="4">最多收藏 </Option>
            <Option value="1">最多评论 </Option>
            <Option value="3">最多查看 </Option>
          </Select>
        </div>
        {(blogList.length > 0 ? blogList.map(item => {
          const isUploadTime = item.uploadTime === item.lastModifyTime
          const time = moment(+item.lastModifyTime).format('YYYY-MM-DD kk:mm:ss')
          return <div className={styles.blogContain} style={{ margin: '16px auto 0' }} key={item._id}>
            <div className={styles.blogHeader}>
              <Link to={`/blog-enjoy/blog-detail?id=${item._id}`}><div className={styles.blogTitle}><Icon type="medium" /> {item.title}</div></Link>
              <div className={styles.blogTags}>{item.typeIds.map(it => {
                return it ? <span className={styles.blogTagsItem} key={it}><Tag color="#637C8F">{it}</Tag></span> : null
              })}</div>
            </div>
            <div className={styles.blogContent}>{item.text}</div>
            <div className={styles.blogFooter}>
              <div className={styles.blogStatistic} onClick={() => message.warning('开发中，尽情期待吧')}>
                <span>
                  <Icon type="like" />
                  <span className={styles.count}>{item.likeCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="star" />
                  <span className={styles.count}>{item.collectCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="message" />
                  <span className={styles.count}>{item.commentCount}</span>
                </span>
                <Divider type="vertical" />
                <span>
                  <Icon type="eye" />
                  <span className={styles.count}>{item.viewCount}</span>
                </span>
              </div>
              <div className={styles.blogTimestamp}>
                <Tag color="#D4DCFC" style={{ color: '#888E9D' }}>
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