# min-dva-admin

#### 基于React、[dva](https://github.com/dvajs/dva)、[antd](https://github.com/ant-design/ant-design)的后台模板

 ## 特性
 * **后台模板** ：参考[antd-admin](https://github.com/zuiidea/antd-admin)编写出具有通用性的后台模板，只需要配置一下`menu.js`和`config.js`里面的参数，即可得到你想要的后台框架
 * **Mock数据** ： [roadhog](https://github.com/sorrycc/roadhog)提供了Mock功能，我们可以脱离后台，自己编写自己的模拟数据接口
 
 ## 快速上手
 1. 克隆项目
  
`git clone https://github.com/dicklwm/min-dva-demo.git`
 2. 安装依赖
 
`npm install`
 
 3. 配置相关的参数和菜单，默认已经添加主页菜单
 
 `utils/config.js` `utils/menu.js`
 - 需要登陆功能，可以在config中设置`needLogin: true`
 - 需要验证码功能的设置`needCaptcha: true,CaptchaAddress: '/captcha.html'`
 - 需要页脚，设置`needFooter: true`
 - 需要面包屑导航，设置`needBread: true`
 - 菜单不想使用本地菜单的话，可以设置成为`menuServer:true`，只要model.app的state里面有menu，且格式与utils/menu.js里面的一致，即可渲染出来
 
 4. Mock
 
 `/mock`文件夹下可以任意添加接口，例：`mock/app.js`
 
 5. 结合min-dva进行开发
 
  - [30分钟学会编写`台账式模板`]()
  - [60分钟学会编写`编辑表格模板`]()
 
 ## License
 [MIT](https://tldrlegal.com/license/mit-license)
