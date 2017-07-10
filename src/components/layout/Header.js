import React from 'react';
import { Menu, Icon, Popover, Modal } from 'antd';
import FontAwesome from 'react-fontawesome';
import { hashHistory } from 'dva/router';

import styles from './main.less';
import Menus from './Menus';


const SubMenu = Menu.SubMenu;

function Header({
                  account, siderFold, isNavbar, menuPopoverVisible,
                  location, switchMenuPopover, logout, switchSider,
                  handleClickNavMenu, menuOpenKeys, menu,
                }) {
  function handleClickMenu(e) {
    switch (e.key) {
      case 'logout':
        Modal.confirm({
          title: '是否确认注销？',
          onOk: () => logout(),
          maskClosable: true,
        });
        break;
      case 'info':

        break;
      default:
        break;
    }
  }

  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu,
    menuOpenKeys,
    location,
    menu,
  };
  return (
    <div className={styles.header} id="header">
      {
        isNavbar ?
          <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
            overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}
          >
            <div className={styles.siderbutton}>
              <Icon type="bars" />
            </div>
          </Popover>
          :
          <div className={styles.siderbutton} onClick={switchSider}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
          </div>
      }

      <Menu className="header-menu" mode="horizontal" onClick={handleClickMenu} selectedKeys={[]}>
        <SubMenu title={<span>
          <Icon type="user" />
          {/* 账号名，请根据不同接口的字段进行修改 */}
          {account.truename}
        </span>}
        >
          <Menu.Item key="info">
            <a><Icon type="idcard" />个人消息</a>
          </Menu.Item>
          <Menu.Item key="changePassword">
            <a><Icon type="lock" />修改密码</a>
          </Menu.Item>
          <Menu.Item key="logout">
            <a><Icon type="logout" />注销</a>
          </Menu.Item>
        </SubMenu>

        <SubMenu className="hover-item" title={<FontAwesome name="refresh" className="hover-spin" />}
          onTitleClick={() => {
            hashHistory.push(location);
          }}
        />

      </Menu>

    </div>
  );
}

export default Header;
