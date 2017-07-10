import React from 'react';
import { connect } from 'dva';
import Index from '../components/layout/Index';
import Login from '../components/Login/Login';

function App({ children, location, dispatch, app }) {
  const { login, account, menu, siderFold, isNavbar, menuPopoverVisible, menuOpenKeys } = app;

  const headerProps = {
    account,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    menuOpenKeys,
    menu,
    switchMenuPopover(opened) {
      dispatch({ type: 'app/switchMenuPopver', payload: opened });
    },
    logout() {
      dispatch({
        type: 'app/logout',
      });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider', payload: location.pathname });
    },
    handleClickNavMenu(value) {
      dispatch({
        type: 'app/changeMenu',
        payload: value,
      });
    },
  };

  const siderProps = {
    siderFold,
    location,
    menuOpenKeys,
    menu,
    handleClickNavMenu(value) {
      dispatch({
        type: 'app/changeMenu',
        payload: value,
      });
    },
  };

  return (
        login ?
          <Index
            headerProps={headerProps}
            siderProps={siderProps}
            siderFold={siderFold}
            isNavbar={isNavbar}
            location={location}
            menu={menu}
          >
            {children}
          </Index>
          :
          <Login
            onOk={
              (data) => {
                dispatch({ type: 'app/login', payload: data });
              }}
          />
  );
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
