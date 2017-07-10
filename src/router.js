import React from 'react';
import { Router } from 'dva/router';

function RouterConfig({ history, app }) {
  /**
   * 优化生成路由
   * @param name
   * @returns {{path: *, name: *, getComponent: (function(*, *))}}
   */
  function makeRoute(name, needModel = false, otherModels) {
    // 正则匹配
    const url = name.replace(/\b(\w)|\s(\w)/g, first => first.toUpperCase());
    return {
      path: name,
      name,
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          if (needModel && !app._models.some(val => (val.namespace === url))) {
            app.model(require(`./models/${url}`));
            if (otherModels) {
              otherModels();
            }
          }
          cb(null, require(`./routes/${url}`));
        });
      },
    };
  }

  const routes = [
    {
      path: '/',
      name: 'app',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/App'));
        });
      },
      indexRoute: {
        name: 'home',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/Home'));
            if (!app._models.some(val => (val.namespace === 'Home'))) {
              app.model(require('./models/Home'));
            }
          });
        },
      },
      childRoutes: [
        // 增加login路由防止报错
        {
          path: 'login',
          name: 'login',
        },

        makeRoute('home', true),
        makeRoute('Table/MTableDemo', true),
        makeRoute('Table/EditTableDemo', true),

      ],
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
