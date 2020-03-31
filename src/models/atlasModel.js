import { queryGetAtlas, queryAddAtlas } from '@/services/index';

const AtlasModel = {
  namespace: 'atlas',
  state: {
    atlasMarkers: [],
    atlasMarker: {}
  },
  effects: {
    *queryGetAtlas(payload, { call, put }) {
      const response = yield call(queryGetAtlas, payload);
      yield put({
        type: 'getAtlas',
        payload: response,
      });
    },
    *queryAddAtlas(payload, { call, put }) {
      const response = yield call(queryAddAtlas, payload);
      yield put({
        type: 'addAtlas',
        payload: response,
      });
    },
  },
  reducers: {
    getAtlas(state, action) {
      return { ...state, atlasMarkers: action.payload || [] };
    },
    addAtlas(state, action) {
      return { ...state, atlasMarker: action.payload || {} };
    },
  },
};
export default AtlasModel;