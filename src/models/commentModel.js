import {
  queryAddComment, 
  queryGetComment
} from '@/services/index'

const CommentModel = {
  namespace: 'comment',
  state: {
    commentList: [],
    commentInfo: {},
  },
  effects: {
    *queryGetComment(payload, { call, put }) {
      const response = yield call(queryGetComment, payload);
      yield put({
        type: 'getComment',
        payload: response,
      });
    },
    *queryAddComment(payload, { call, put }) {
      const response = yield call(queryAddComment, payload);
      yield put({
        type: 'addComment',
        payload: response,
      });
    }
  },
  reducers: {
    getComment(state, action) {
      return { ...state, commentList: action.payload || [] };
    },
    addComment(state, action) {
      return { ...state, commentInfo: action.payload || [] };
    },
  },
};
export default CommentModel;