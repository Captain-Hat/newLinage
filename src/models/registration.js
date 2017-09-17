import { message } from 'antd';
import * as usersService from '../services/services';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'registration',
  state: {},
  reducers: {

  },
  effects: {
    *sumit({ payload: values }, { call, put }) {
      const { data, headers } = yield call(usersService.sumit, values);
      if (data.errcode == 200) {
        message.success('注册成功')
      }
      // Inside Effects
      yield put(routerRedux.push('/'))
      yield put({
        type: 'main/changeActive', payload: {
          location: { pathname: '/home' }
        }
      })
    }
  },
  subscriptions: {},
};
