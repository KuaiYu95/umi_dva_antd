import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Input, message } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import router from 'umi/router';
import util from '../../utils/utils';
import MdEditor from '@/components/MdEditor/index'
import styles from './index.less';

class BlogEdit extends React.Component {
  constructor(props) {
    super(props);
    this.query = util.query()
    this.id = this.query.id || ''
    this.state = {
      loading: true,
      text: '',
      title: '',
      html: '',
      types: '',
      btnLoading: false,
    }
  }

  componentDidMount() {
    if (this.id) {
      this.setState({ loading: true }, () => {
        this.props.dispatch({
          type: 'blog/queryGetBlogDetail',
          payload: { _id: this.id },
        }).then(() => {
          const { success, data } = this.props.blogDetail
          if (success) {
            const { text, commentCount, likeCount, collectCount, viewCount, title, html, typeIds, uploadTime } = data
            this.setState({ text, loading: false, commentCount, likeCount, collectCount, viewCount, title, html, types: typeIds.join(','), uploadTime })
          }
        })
      })
    }
  }

  handleSelect = e => {
    const { value } = e.target
    this.setState({ types: value })
  }

  handleTitle = e => {
    const { value } = e.target
    this.setState({ title: value })
  }

  getValue = (html, text) => {
    this.setState({ html, text })
  }

  getFile = event => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader()
      if (/text\/markdown/.test(file.type)) {
        reader.onload = e => {
          this.setState({
            title: file.name.split('.md')[0],
            text: e.target.result
          })
        }
        reader.readAsText(file);
      } else {
        message.error('仅支持上传 markdown 文件')
      }
    }
  }

  onSubmit = () => {
    const { title, text, html, types, commentCount, likeCount, collectCount, viewCount, uploadTime } = this.state
    const lastModifyTime = new Date().getTime()
    const typeIds = types.replace(/[ ]/g, "").replace(/，/g, ",").split(',').filter( it => it)
    if (title.trim() === '') {
      message.warning('请输入标题')
    } else if (typeIds.length === 0) {
      message.warning('请对博客分类')
    } else if (text.trim() === '') {
      message.warning('请输入内容')
    } else {
      this.setState({ btnLoading: true }, () => {
        this.props.dispatch({
          type: 'blog/queryUpdateBlog',
          payload: { _id: this.id, title: title.trim(), text, html, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, collectCount, viewCount },
        }).then(() => {
          const successInfo = `博客：${title} 更新成功`
          message.success(successInfo)
          router.push(`/blog-enjoy/blog-detail?id=${this.id}`)
        }).finally(() => {
          this.setState({ btnLoading: false })
        })
      })
    }
  }

  hangleChange = (value) => {
    this.setState({ text: value })
  }

  render() {
    const { loading, text, title, types, btnLoading } = this.state
    return (
      !loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.tabLine} style={{ width: '100%', margin: '0 0 16px' }}>
          <Link to='/blog-enjoy'><Button type="primary"><Icon type="left" /> 博客列表</Button></Link>
          <Input placeholder="请输入标题" value={title} onChange={this.handleTitle} allowClear />
          <Input placeholder="请输入类型" value={types} onChange={this.handleSelect} allowClear style={{ width: '25%' }} />
          <label htmlFor={"up"}>
            <span className={styles.upload}><Icon type="upload" /> 上传 Markdown 文件</span>
            <input style={{ display: 'none' }} id="up" type="file" onChange={this.getFile} />
          </label>
          <Button loading={btnLoading} onClick={this.onSubmit}>发布</Button>
        </div>
        <div className={styles.writeBlog}>
          <MdEditor getValue={this.getValue} value={text} />
        </div>
      </div> : <BlockLoading loading={loading} text={'正在为你加载相关插件，可能需要一点时间'} />
    )
  }
}

export default connect(({ blog }) => ({
  blogDetail: blog.blogDetail,
}))(BlogEdit);