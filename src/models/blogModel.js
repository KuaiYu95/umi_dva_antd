import { queryGetBlog, queryGetBlogDetail, queryAddBlog } from '@/services/index';

const BlogModel = {
  namespace: 'blog',
  state: {
    blogLists: [],
    blogDetail: {},
    addBlogInfo: {}
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
      return { ...state, blogDetail: action.payload || {} };
    },
    addBlog(state, action) {
      return { ...state, addBlogInfo: action.payload || {} };
    },
  },
};
export default BlogModel;