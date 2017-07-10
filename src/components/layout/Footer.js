import React from 'react';
import styles from './main.less';
import { footerText } from '../../utils/config';

const Footer = () =>
  <div className={styles.footer}>
    {footerText}
  </div>;

export default Footer;
