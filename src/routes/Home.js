import React from 'react';
import { connect } from 'dva';
import styles from './Home.less';

function Home() {
  return (
    <article className={styles.article}>
      <h1>Min-Dva</h1>
      <h2 >基于React、Dva、Antd的便捷式开发框架</h2>
      <h3>可以快速开发出台账式布局、左树右表式布局等布局</h3>
      <p>封装了min类，提供工具类、和通用的简化antd代码的组件</p>
    </article>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
