import React from 'react';
import BlockLoading from '@/components/BlockLoading/index';
import { Button, Icon, Input, Select, message, notification } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import router from 'umi/router';
import MdEditor from '@/components/MdEditor/index'
import styles from './index.less';

const { Option } = Select
class PostBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
      title: '',
      html: '',
      typeIds: [],
    }
  }

  handleSelect = value => {
    this.setState({ typeIds: value })
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
    const { title, text, html, typeIds } = this.state
    const uploadTime = new Date().getTime()
    const lastModifyTime = uploadTime
    const commentCount = 0
    const likeCount = 0
    const collectCount = 0
    const viewCount = 0
    if (title.trim() === '') {
      message.warning('请输入标题')
    } else if (typeIds.length === 0) {
      message.warning('请对博客分类')
    } else if (text.trim() === '') {
      message.warning('请输入内容')
    } else {
      this.props.dispatch({
        type: 'blog/queryAddBlog',
        payload: { title: title.trim(), text, html, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, collectCount, viewCount },
      }).then(() => {
        const { success } = this.props.addBlogInfo
        if (success) {
          this.setState({ title: '', text: '', typeIds: [], html: '' })
          router.push('/blog-enjoy')
        }
      })
    }
  }

  render() {
    const { loading, text, title, typeIds } = this.state
    const blogType = [
      'HTML / CSS', 'JS / TS', 'React及其周边技术栈', '各端小程序开发', '移动端 H5', 'webpack', '其他技术框架', '数据库', '数据结构与算法', '开发工具', '计算机网络', '其他'
    ]
    return (
      loading ? <div className={styles.blog} style={{ padding: '24px 0' }}>
        <div className={styles.tabLine} style={{ width: '100%', margin: '0 0 16px' }}>
          <Link to='/blog-enjoy'><Button type="primary"><Icon type="left" /> 博客列表</Button></Link>
          <Input placeholder="请输入标题" value={title} onChange={this.handleTitle} allowClear />
          <Select placeholder="请对博客分类" mode="multiple" style={{ minWidth: 235 }} value={typeIds} onChange={this.handleSelect} maxTagCount={2} maxTagTextLength={4}>
            {blogType.map(it => {
              return <Option key={it}>{it}</Option>
            })}
          </Select>
          <label htmlFor={"aaaa"}>
            <span className={styles.upload}><Icon type="upload" /> 上传 Markdown 文件</span>
            <input style={{ display: 'none' }} id="aaaa" type="file" onChange={this.getFile} />
          </label>
          <Button onClick={this.onSubmit}>发布</Button>
        </div>
        <div className={styles.writeBlog}>
          <MdEditor getValue={this.getValue} value={text} />
        </div>
      </div> : <BlockLoading loading={loading} />
    )
  }
}

export default connect(({ blog }) => ({
  addBlogInfo: blog.addBlogInfo,
}))(PostBlog);