import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less';
import localMenu from '../../utils/menu';
import config from '../../utils/config';

const pathSet = [];
const getPathSet = function (menuArray, parentPath = '/') {
  menuArray.forEach((item) => {
    pathSet[(parentPath + item.module).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.module,
      title: item.title,
      icon: item.class || '',
      clickable: item.clickable === undefined,
    };
    if (item.sub) {
      getPathSet(item.sub, `${parentPath}${item.module}/`);
    }
  });
};


function Bread({ location, menu }) {
  const pathNames = [];
  getPathSet(config.menuServer ? menu : localMenu);
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump());
    } else {
      pathNames.push((`-${item}`).hyphenToHump());
    }
  });

  const breads = pathNames.map((name, key) => {
    const item = name;
    // 判断是否默认打开的主页
    if (!(item in pathSet)) {
      return false;
      // item = (`-${config.defaultSelectMenu}`).hyphenToHump();
    }
    return (
      <Breadcrumb.Item
        key={key}
      >
        {
          pathSet[item].icon ? <Icon type={pathSet[item].icon} />
            : ''
        }
        <span>{pathSet[item].title}</span>
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread} id="bread">
      <Breadcrumb className={styles.item}>
        <Breadcrumb.Item
          key="home"
        >
          <Link to="/home">
            <Icon type="home" />
            <span>主页</span>
          </Link>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  );
}

Bread.propTypes = {
  location: PropTypes.object,
};

export default Bread;
