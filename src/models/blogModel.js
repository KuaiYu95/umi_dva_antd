import { 
  queryGetBlog, 
  queryGetBlogDetail, 
  queryAddBlog, 
  queryAddBlogView, 
  queryAddBlogLike, 
  queryDelBlog, 
  queryUpdateBlog, 
  queryDecBlogLike, 
  queryBlogDownload
} from '@/services/index';

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
    *queryAddBlogView(payload, { call, put }) {
      const response = yield call(queryAddBlogView, payload);
      yield put({
        type: 'getBlogViewCount',
        payload: response,
      });
    },
    *queryAddBlogLike(payload, { call, put }) {
      const response = yield call(queryAddBlogLike, payload);
      yield put({
        type: 'getBlogLikeCount',
        payload: response,
      });
    },
    *queryBlogDownload(payload, { call, put }) {
      const response = yield call(queryBlogDownload, payload);
      yield put({
        type: 'blogDownload',
        payload: response,
      });
    },
    *queryDecBlogLike(payload, { call, put }) {
      const response = yield call(queryDecBlogLike, payload);
      yield put({
        type: 'getBlogLikeCount',
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
    *setBlogTitle(payload, { put }) {
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
    *queryDelBlog(payload, { call, put }) {
      const response = yield call(queryDelBlog, payload);
      yield put({
        type: 'delBlog',
        payload: response,
      });
    },
    *queryUpdateBlog(payload, { call, put }) {
      const response = yield call(queryUpdateBlog, payload);
      yield put({
        type: 'updateBlog',
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
      const newState = JSON.parse(JSON.stringify(state));
      newState.blogTitle = action.data
      return newState
    },
    addBlog(state, action) {
      return { ...state, addBlogInfo: action.payload || {} };
    },
    delBlog(state, action) {
      return { ...state, blogDetail: action.payload || {} };
    },
    blogDownload(state, action) {
      return { ...state, blogDetail: action.payload || {} };
    },
    updateBlog(state, action) {
      return { ...state, blogDetail: action.payload || {} };
    },
    getBlogViewCount(state, action) {
      return { ...state, blogDetail: action.payload || {} };
    },
    getBlogLikeCount(state, action) {
      return { ...state, blogDetail: action.payload || {} };
    },
  },
};
export default BlogModel;