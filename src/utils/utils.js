
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const util = {
  isUrl: path => reg.test(path),
  query: () => {
    const queryString = window.location.search.slice(1)
    const queryUrl = {}
    if (queryString.includes('=')) {
      queryString.split('&').forEach(it => {
        const left = it.split('=')[0]
        const right = it.split('=')[1]
        queryUrl[left] = right
      })
    }
    return queryUrl
  },
  download: (title, text) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(text)}`);
    element.setAttribute('download', title);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
  localSchema: (type, id) => {
    const schema = JSON.parse(localStorage.getItem(type)) || []
    if (schema.includes(id)) {
      return true
    }
    if (schema.length >= 50) {
      schema.shift()
    }
    schema.push(id)
    localStorage.setItem(type, JSON.stringify(schema))
    return false
  }
}

window.hh = util
export default util