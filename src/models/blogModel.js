import { queryGetBlog, queryGetBlogDetail, queryAddBlog } from '@/services/index';

const BlogModel = {
  namespace: 'blog',
  state: {
    blogLists: [],
    blogDetail: {},
    addBlogInfo: {},
    blogTitle: '',
  },
  effects: {
    *queryGetBlog(payload, { call, put }) {
      const response = yield call(queryGetBlog, payload);
      yield put({
        type: 'getBlogList',
        payload: response,
      });
    },
    *queryGetBlogDetail(payload, { call, put }) {
      const response = yield call(queryGetBlogDetail, payload);
      yield put({
        type: 'getBlogDetail',
        payload: response,
      });
    },
    *setBlogTitle(payload, { call, put }) {
      console.log(payload, 2)
      yield put({
        type: 'setTitle',
        data: payload.data,
      });
    },
    *queryAddBlog(payload, { call, put }) {
      const response = yield call(queryAddBlog, payload);
      yield put({
        type: 'addBlog',
        payload: response,
      });
    },
  },
  reducers: {
    getBlogList(state, action) {
      return { ...state, blogLists: action.payload || [] };
    },
    getBlogDetail(state, action) {
      return { ...state, blogDetail: action.payload || {}, blogTitle: action.payload ? action.payload.data.title : '' };
    },
    setTitle(state, action) {
      const _state = JSON.parse(JSON.stringify(state));
      _state.blogTitle = action.data
      return _state
    },
    addBlog(state, action) {
      return { ...state, addBlogInfo: action.payload || {} };
    },
  },
};
export default BlogModel;