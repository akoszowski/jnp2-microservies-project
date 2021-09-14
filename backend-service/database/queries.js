const dbOperator = require('./dbOperator')

class Queries {
    static async getTickers() {
        const res = await dbOperator.query('SELECT DISTINCT ticker FROM stock')
        return res.rows
    }

    static async getPricesInBetween(startDate, endDate) {
        const res = await dbOperator.query('SELECT * FROM stock WHERE (date >= $1 AND date <= $2) ORDER BY date', [startDate, endDate])
        return res.rows
    }
}

module.exports = Queries