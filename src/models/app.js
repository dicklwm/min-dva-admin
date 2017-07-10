import { hashHistory } from 'dva/router';
import * as appServices from '../services/app';
import config from '../utils/config';

export default {
  namespace: 'app',
  state: {
    login: !config.loginConfig.needLogin || sessionStorage.getItem('login') === 'true',
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    isNavbar: document.body.clientWidth < 769,
    menuOpenKeys: [],
    account: JSON.parse(sessionStorage.getItem('account')) || { truename: 'guest' },
    // menu: JSON.parse(sessionStorage.getItem('menu')) || [],
    clientWidth: document.body.clientWidth,
    clientHeight: document.body.clientHeight,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(appServices.login, payload);
      if (res.errorCode === 0) {
        yield put({
          type: 'loginSuccess',
          payload: {
            account: res.data,
            // menu: res.data.menu,
          },
        });
        hashHistory.push('/home');
      }
    },

    *logout(action, { call, put }) {
      const res = yield call(appServices.logout);
      if (res.errorCode === 0) {
        yield put({
          type: 'logoutSuccess',
        });
        hashHistory.push('/login');
      }
    },

    *changeNavbar(action, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' });
      } else {
        yield put({ type: 'hideNavbar' });
      }
    },
  },
  reducers: {
    loginSuccess(state, action) {
      window.sessionStorage.setItem('login', true);
      window.sessionStorage.setItem('account', JSON.stringify(action.payload.account));
      // window.sessionStorage.setItem('menu', JSON.stringify(action.payload.menu));
      return {
        ...state,
        ...action.payload,
        login: true,
      };
    },
    logoutSuccess(state) {
      window.sessionStorage.clear();
      return {
        ...state,
        login: false,
      };
    },
    // 切换收缩模式
    switchSider(state, action) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
        menuOpenKeys: state.siderFold ? action.payload.split('/') : [null],
      };
    },
    // 切换小屏幕
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true,
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false,
      };
    },
    // 点击小屏幕菜单
    switchMenuPopver(state, action) {
      if (!state.isNavbar) {
        return {
          ...state,
          menuPopoverVisible: action.payload,
        };
      }
      return state;
    },
    // 改变菜单
    changeMenu(state, { payload }) {
      return {
        ...state,
        menuOpenKeys: state.siderFold ? payload : [payload[1]],
      };
    },
    changeNavbar(state) {
      return {
        ...state,
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      window.onresize = () => dispatch({ type: 'changeNavbar' });
      // 监听路由转换，转换后切换菜单
      history.listen(({ pathname }) => {
        // 监听login路由
        if (pathname === '/login') {
          // notification.error({ message: '出错', description: '请登录' });
          dispatch({ type: 'logoutSuccess' });
          // history.push('/');
        } else {
          // 路由改变时改变菜单的打开状态
          dispatch({
            type: 'changeMenu',
            payload: localStorage.getItem('antdAdminSiderFold') === 'true' ? [] : pathname.split('/'),
          });
          // 小屏，切换菜单时，收回菜单
          dispatch({
            type: 'switchMenuPopver',
            payload: false,
          });
        }
      });
    },
  },
};
