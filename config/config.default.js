/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1672046876031_1565';

  // add your middleware config here
  config.middleware = [];

  // csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  // egg-view-ejs插件的配置
  config.view = {
    mapping: { '.html': 'ejs' }, // 左边写成.html后缀，会自动渲染.html文件
  };

  // mysql 配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'eggdemo',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 中间件
  config.middleware = [ 'responseTime' ];
  // 鉴权
  config.jwt = {
    secret: 'demo-xulif',
    // match: /^\/api/,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
