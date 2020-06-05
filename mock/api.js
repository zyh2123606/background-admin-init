export default {
  'POST /api/login': (req, res) => {
    setTimeout(() => {
      res.json({
        code: 0,
        msg: '登录成功',
      });
    }, 2000);
  },
  'GET /api/getMenu': (req, res) => {
    setTimeout(() => {
      res.json({
        code: 0,
        message: '请求成功',
        status: 'success',
        data: [
          {
            name: '用户管理',
            path: '/user-manager',
            authority: ['USER_MANAGER'],
          },
          {
            name: '角色管理',
            path: '/role-manager',
            authority: ['ROLE_MANAGER'],
          },
          {
            name: '菜单管理',
            path: '/menu-manager',
            authority: ['MENU_MANAGER'],
          },
        ],
      });
    }, 1000);
  },
};
