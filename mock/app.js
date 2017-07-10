/** Created by Min on 2017-07-07.  */

// 系统定义的用户
const admin_account = [
  {
    username: 'Min',
    password: '123456',
  },
  {
    username: 'guest',
    password: 'guest',
  },
  {
    username: 'admin',
    password: 'admin',
  },
];

export default{
  'POST /login': (req, res) => {
    const user = admin_account.find(item => item.username === req.body.username);
    if (user) {
      if (user.password === req.body.password) {
        res.json({
          errorCode: 0,
          msg: '登陆成功',
          data: {
            truename: req.body.username,
          },
        });
      } else {
        res.json({
          errorCode: 1,
          msg: '密码错误',
        });
      }
    } else {
      res.json({
        errorCode: 2,
        msg: '用户不存在',
      });
    }
  },
  'POST /logout': {
    errorCode: 0,
    msg: 'logout success',
  },
};
