import React from 'react';
import { Comment, Input, Button, Avatar, Form, message } from 'antd';
import DefaultSettings from '../../../config/defaultSettings';
import styles from './index.less';

const { TextArea } = Input;
export default class CommentTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      value: '',
    }
  }

  handleSubmit = () => {
    const { value } = this.state
    if (value) {
      this.setState({ submitting: true }, () => {
        this.props.isComment(value)
        setTimeout(() => {
          this.setState({ submitting: false })
        }, 200)
      })
    } else {
      message.warning('请发表言论后再发布！')
    }
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { submitting, value } = this.state;
    return (
      <div className={styles.commentTextArea}>
        <Comment
          avatar={
            <Avatar style={{ backgroundColor: DefaultSettings.primaryColor, verticalAlign: 'middle' }}>评</Avatar>
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    )
  }
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div className={styles.editor}>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="来发表一下意见或者建议吧" />
    </Form.Item>
    <Form.Item>
      <Button className={styles.btn} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        发布
      </Button>
    </Form.Item>
  </div>
);