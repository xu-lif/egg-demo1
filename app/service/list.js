const Service = require('egg').Service;

class ListService extends Service {
  async get(id) {
    // const data = await this.app.mysql.query('select * from users where id = 1');
    const data = await this.app.mysql.get('users', {
      id,
    });
    console.log('data', data);
    return data;
  }
}

module.exports = ListService;
