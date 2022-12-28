const { Controller } = require('egg');

class RecordsController extends Controller {
  async addOneRecord() {
    const bodyData = this.ctx.request.body;
    // 参数验证
    if (!bodyData || !bodyData.title || !bodyData.desc || !bodyData.time) {
      this.ctx.body = {
        code: 12,
        msg: '参数错误',
        data: {},
      };
      return;
    }
    const useInfo = this.ctx.state.user;
    const recordId = await this.service.records.addOne({
      u_id: useInfo.id,
      ...bodyData,
    });
    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data: {
        id: recordId,
      },
    };
  }
  async findAllRecordsByUser() {
    const list = await this.service.records.findListByUserId(this.ctx.state.user.id);
    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data: {
        list: list.map(v => {
          return {
            id: v.id,
            title: v.title,
            desc: v.desc,
            time: v.time,
          };
        }),
      },
    };
  }
}

module.exports = RecordsController;
