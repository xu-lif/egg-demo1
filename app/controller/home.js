'use strict';

const { Controller } = require('egg');

/**
 * 获取路由中的参数 ctx.query; ctx.params; ctx.request.body
 */
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async list() {
    const { ctx } = this;
    const userInfo = ctx.state.user;
    console.log('userInfo', userInfo);
    const data = await ctx.service.list.get(userInfo.id);
    ctx.body = data;
    // await this.ctx.render('index.html', {
    //   title: 'egg-view-ejs-test-data',
    // });
  }

  async listAdd() {
    const data = this.ctx.request.body;
    this.ctx.body = data;
  }
}

module.exports = HomeController;
