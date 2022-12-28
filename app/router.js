'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtVertify(app.config.jwt.secret);
  router.get('/', controller.home.index);
  router.get('/list', _jwt, controller.home.list);
  router.post('/list/add', controller.home.listAdd);
  router.put('/list/add', controller.home.listAdd);

  // router.get('/users/:id', controller.users.getById);
  // router.get('/users', controller.users.getAll);
  // router.post('/users', controller.users.insertUser);
  // router.put('/users/:id', controller.users.updateUser);
  // router.delete('/users/:id', controller.users.deleteUser);
  router.post('/register', controller.users.resigterUser);
  router.post('/login', controller.users.login);

  router.post('/records', _jwt, controller.records.addOneRecord);
  router.get('/records', _jwt, controller.records.findAllRecordsByUser);
};
