
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
  }
}

window.hh = util
export default util