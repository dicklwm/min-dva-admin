// 导入logo图
import logo from '../assets/Images/logo.png';
import login_bg from '../assets/Images/login_bg.jpg';

module.exports = {
  name: 'Min-Dva', // 登录时候的name
  footerText: '版权所有 © 2017 Made By Min ',
  logoSrc: logo,
  logoText: 'Min-Dva', // 登录后logo旁的Text
  // 登陆配置
  loginConfig: {
    needLogin: true,
    needCaptcha: false,
    CaptchaAddress: '/captcha.html',
    needRegister: false, // 是否需要注册按钮
    logoBackground: login_bg,
  },
  defaultSelectMenu: 'home',
  needBread: true,
  needFooter: false,

  // 菜单是否服务端渲染，配置为true，则从store.app.menu里面拿菜单，false时，则从menu.js里面拿
  menuServer: false,

};

window.version = 'Min-Dva-Demo v0.2.0';
