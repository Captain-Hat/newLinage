import CookieTool from '../routes/share/cookie'
export default {
  namespace: 'main',
  state: {
    location: {
      pathname: '/home'
    },
    accessInfo: {
      access: '',
      userName: ''
    }
  },
  reducers: {
    changeActive(state, { payload: { location } }) {
      console.log({ ...state, location })
      return { ...state, location };
    },
    changeLogin(state, { payload: { accessInfo } }) {
      console.log({ ...state, accessInfo })
      return { ...state, accessInfo };
    },

  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let accessInfo = CookieTool.getCookie('accessInfo') ? CookieTool.getCookie('accessInfo') : { access: '', userName: '' }
        console.log(accessInfo)
        dispatch({ type: 'changeLogin', payload: { accessInfo } });
      });
    },
  },
};
