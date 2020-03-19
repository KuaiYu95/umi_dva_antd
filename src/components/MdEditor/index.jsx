
import * as React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }, props) {
  props.getValue(html, text)
}
export default props => {
  return (
    <MdEditor
      style={{width: '100%', height: 'calc(100vh - 160px)'}}
      value={props.value}
      renderHTML={text => mdParser.render(text)}
      onChange={e => handleEditorChange(e, props)}
    />
  )
}