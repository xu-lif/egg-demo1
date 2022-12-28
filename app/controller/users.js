'use strict';
const { Controller } = require('egg');
const dayjs = require('dayjs');

class UsersController extends Controller {
  // 注册
  async resigterUser() {
    const {
      name,
      password,
    } = this.ctx.request.body;
    // 查询userName是否已经注册了
    try {
      const userInfo = await this.service.users.queryUserInfoByUserName(name);
      console.log('userInfo', userInfo);
      if (userInfo && userInfo.id) {
        this.ctx.body = {
          code: 500,
          msg: '已经注册了',
        };
        return;
      }
      // 可以正常注册
      const insertId = await this.service.users.saveUserInfo({
        name,
        password,
        avatar: 'https://files.codelife.cc/blog/avatar/default-avatar.png?x-oss-process=image/resize,limit_0,m_fill,w_40,h_40/quality,q_100',
        cTime: dayjs().toISOString(),
      });
      this.ctx.body = {
        code: 0,
        msg: '注册成功',
        data: {
          id: insertId,
        },
      };
    } catch (err) {
      this.ctx.body = {
        code: 500,
        msg: '出错了',
        err,
      };
    }

  }
  // 登陆
  async login() {
    const {
      name,
      password,
    } = this.ctx.request.body;
    const userInfo = await this.service.users.queryUserInfoByUserName(name);
    console.log('userInfo', userInfo);
    if (!userInfo || !userInfo.id) {
      this.ctx.body = {
        code: 404,
        msg: '用户不存在',
      };
      return;
    }
    if (userInfo && userInfo.password !== password) {
      this.ctx.body = {
        code: 400,
        msg: '密码不正确',
      };
      return;
    }
    const token = this.app.jwt.sign({
      id: userInfo.id,
      name: userInfo.name,
      // exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, this.app.config.jwt.secret);
    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data: {
        token,
      },
    };
  }
  // async getById() {
  //   const {
  //     id,
  //   } = this.ctx.params;
  //   const data = await this.ctx.service.users.index({ id });
  //   this.ctx.body = data;
  // }

  // async getAll() {
  //   const data = await this.ctx.service.users.indexAll();
  //   this.ctx.body = data;
  // }

  // async insertUser() {
  //   const reqData = this.ctx.request.body;
  //   const insertId = await this.ctx.service.users.insert(reqData);
  //   this.ctx.body = {
  //     id: insertId,
  //   };
  // }

  // async updateUser() {
  //   const { id } = this.ctx.params;
  //   const bodyData = this.ctx.request.body;
  //   const updateId = await this.ctx.service.users.update(id, bodyData);
  //   this.ctx.body = {
  //     id: updateId,
  //   };
  // }

  // async deleteUser() {
  //   const { id } = this.ctx.params;
  //   const deleteId = await this.ctx.service.users.del(id);
  //   this.ctx.body = {
  //     id: deleteId,
  //   };
  // }
}

module.exports = UsersController;
