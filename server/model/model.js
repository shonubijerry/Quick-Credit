import debug from 'debug';
import pool from '../config/connection.db';

class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;
    this.logger = debug('app/debug');
  }

  logJSON(data) {
    return this.logger(JSON.stringify(data, null, '\t'));
  }

  async insert(columns, selector, values) {
    const queryString = `INSERT INTO ${this.table} (${columns}) VALUES(${selector}) returning *`;
    try {
      const response = await this.pool.query(queryString, values);
      this.logJSON(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async select(columns) {
    const queryString = `SELECT ${columns} FROM ${this.table}`;
    debug('app/debug')(queryString);
    try {
      const response = await this.pool.query(queryString);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async selectWhere(columns, selector, values) {
    const queryString = `SELECT ${columns} FROM ${this.table} WHERE ${selector}`;
    debug('app/debug')(queryString);
    try {
      const response = await this.pool.query(queryString, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async selectWithJoin(columns, selectors, values) {
    const queryString = `SELECT ${columns} FROM ${this.table} repay INNER JOIN loans ON (repay.loanid = loans.id) WHERE ${selectors} `;
    debug('app/debug')(queryString);
    try {
      const response = await this.pool.query(queryString, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async update(columns, selector, values) {
    const queryString = `UPDATE ${this.table} SET ${columns} WHERE ${selector} returning *`;
    debug('app/debug')(queryString);
    try {
      const response = await this.pool.query(queryString, values);
      // this.logJSON(response);
      return response;
    } catch (err) {
      throw err;
    }
  }

  // async delete(selector, value) {
  //   const queryString = `DELETE FROM ${this.table} WHERE ${selector} returning *`;
  //   debug('app/debug')(queryString);
  //   try {
  //     const response = await this.pool.query(queryString, value);
  //     return response;
  //   } catch (err) {
  //     debug('app/debug')(err);
  //     throw err;
  //   }
  // }
}

export default Model;
