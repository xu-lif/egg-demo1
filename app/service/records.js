const Service = require('egg').Service;

class RecordsService extends Service {
  async addOne(data) {
    // const data = await this.app.mysql.query('select * from users where id = 1');
    const sqlData = await this.app.mysql.insert('records', data);
    console.log('sqlData', sqlData);
    return sqlData.insertId;
  }
  async findListByUserId(id) {
    const sqlData = await this.app.mysql.select('records', {
      where: {
        u_id: id,
      },
    });
    return sqlData;
  }
}

module.exports = RecordsService;
