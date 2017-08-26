
export default {
  namespace: 'main',
  state: {
    location: {
      pathname: '/home'
    }
  },
  reducers: {
    changeActive(state, { payload: { location } }) {
      console.log({ ...state, location })
      return { ...state, location };
    },
  },
  effects: {},
  subscriptions: {},
};
