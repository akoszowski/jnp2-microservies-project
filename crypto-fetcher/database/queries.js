const format = require('pg-format')
const dbOperator = require('./dbOperator')

class Queries {
    static async flushData() {
        return await dbOperator.query('DELETE FROM stock')
    }

    static async getLastUpdate() {
        let res = await dbOperator.query('SELECT MAX(date) FROM stock')
        return res.rows[0].max
    }

    static async pushTickerData(ticker, close, date) {
        let vals = [ticker, close, date]
        return await dbOperator.query('INSERT INTO stock VALUES(DEFAULT, $1, $2, $3)', vals)
    }
}

module.exports = Queries