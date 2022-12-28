const { Service } = require('egg');

class Users extends Service {
  async queryUserInfoByUserName(userName) {
    return await this.app.mysql.get('users', {
      name: userName,
    });
  }
  async saveUserInfo(data) {
    const sqlData = await this.app.mysql.insert('users', data);
    return sqlData.insertId;
  }
  // async index(whereData) {
  //   return await this.app.mysql.select('users', {
  //     where: whereData,
  //   });
  // }

  // async indexAll() {
  //   return await this.app.mysql.select('users');
  // }

  // async update(id, data) {
  //   await this.app.mysql.update('users', data, {
  //     where: {
  //       id,
  //     },
  //   });
  //   return id;
  // }

  // async insert(data) {
  //   const sqlData = await this.app.mysql.insert('users', data);
  //   return sqlData.insertId;
  // }

  // async del(id) {
  //   await this.app.mysql.delete('users', { id });
  //   return id;
  // }
}

module.exports = Users;
