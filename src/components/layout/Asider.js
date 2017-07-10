import React from 'react';
import styles from './main.less';
import config from '../../utils/config';
import Menus from './Menus';

function Asider({ siderFold, location, handleClickNavMenu, menuOpenKeys, menu }) {
  const menusProps = {
    siderFold,
    location,
    handleClickNavMenu,
    menuOpenKeys,
    menu,
  };
  return (
    <div>
      <div className={styles.logo}>
        <img
          className={styles.logoImage}
          src={config.logoSrc}
          alt="logo"
        />
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} />
    </div>
  );
}

export default Asider;
