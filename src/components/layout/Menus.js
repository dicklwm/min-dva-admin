import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import localMenu from '../../utils/menu';
import config from '../../utils/config';

const SubMenu = Menu.SubMenu;

/**
 * 递归生成菜单配置文件的所有菜单，包括子菜单
 * @param menuArray 菜单数组
 * @param siderFold 是否收缩状态
 * @param parentPath 父菜单的路径
 */
const getMenus = function (menuArray, siderFold, parentPath = '/') {
  return menuArray.map((item) => {
    if (item.sub) {
      return (
        <SubMenu
          key={item.module}
          title={
            <span>
              {item.class ? <Icon type={item.class} /> : ''}
              {siderFold || item.title}
            </span>
          }
        >
          {getMenus(item.sub, siderFold, `${parentPath + item.module}/`)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.module}>
          <Link to={parentPath + item.module}>
            {item.class ? <Icon type={item.class} /> : ''}
            {item.title}
          </Link>
        </Menu.Item>
      );
    }
  });
};

function Menus({ siderFold, location, handleClickNavMenu, className, menuOpenKeys, menu }) {
  const menuItems = getMenus(config.menuServer ? menu : localMenu, siderFold);
  return (
    <Menu
      className={className}
      mode={siderFold ? 'vertical' : 'inline'}
      theme="dark"
      openKeys={menuOpenKeys}
      onOpenChange={handleClickNavMenu}
      defaultOpenKeys={siderFold ? null : [location.pathname.split('/')[1]]}
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split(
        '/').length - 1] || config.defaultSelectMenu]}
    >
      <Menu.Item key="home">
        <Link to="/home">
          <Icon type="home" />
          {siderFold || '主页'}
        </Link>
      </Menu.Item>
      {menuItems}
    </Menu>
  );
}

export default Menus;
