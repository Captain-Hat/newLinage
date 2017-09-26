import * as homeService from '../services/services';
export default {
  namespace: 'index',
  state: {
    items: [],
    gamerInfo: [],
    gamerInfo2: [],
    updateItem: []
  },
  reducers: {
    save(state, { payload: { data: items } }) {
      console.log({ ...state, items });
      return { ...state, items };
    },
    saveInfo(state, { payload: { data: gamerInfo } }) {
      console.log({ ...state, gamerInfo });
      return { ...state, gamerInfo };
    },
    saveInfo2(state, { payload: { data: gamerInfo2 } }) {
      console.log({ ...state, gamerInfo2 });
      return { ...state, gamerInfo2 };
    },
    getNewtable(state, { payload: { data: items } }) {
      console.log({ ...state, items });
      return { ...state, items };
    },
    getUpdate(state, { payload: { data: updateItem } }) {
      console.log({ ...state, updateItem });
      return { ...state, updateItem };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(homeService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.data,
        },
      });
    },
    *getGamerInfo({ payload: { } }, { call, put }) {
      const { data, headers } = yield call(homeService.getGamerInfo, {});
      yield put({
        type: 'saveInfo',
        payload: {
          data: data.data,
        },
      });
    },
    *getGamerInfo2({ payload: { } }, { call, put }) {
      const { data, headers } = yield call(homeService.getGamerInfo2, {});
      yield put({
        type: 'saveInfo2',
        payload: {
          data: data.data,
        },
      });
    },
    *changeNotice({ payload: key }, { call, put }) {
      const { data, headers } = yield call(homeService.changeNotice, key);
      yield put({
        type: 'getNewtable',
        payload: {
          data: data.data,
        },
      });
    },
    *updateInfo({ payload: page }, { call, put }) {
      const { data, headers } = yield call(homeService.getUpdate, page);
      yield put({
        type: 'getUpdate',
        payload: {
          data: data.data,
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(homeService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(homeService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put }) {
      yield call(homeService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: query });
          // 循环调用
          setInterval(() => {
            dispatch({ type: 'getGamerInfo', payload: query });
            dispatch({ type: 'getGamerInfo2', payload: query });
          }, 60000)
          dispatch({ type: 'updateInfo', payload: { type: 4, current: 1, pageSize: 10 } });
        }
      });
    },
  },
};
