const dbOperator = require('./dbOperator')

class Queries {
    static async getTickers() {
        const res = await dbOperator.query('SELECT DISTINCT ticker FROM stock')
        return res.rows
    }

    static async getPricesInBetween(ticker, startDate, endDate) {
        const res = await dbOperator.query('SELECT * FROM stock WHERE (ticker = $1 AND date >= $2 AND date <= $3) ORDER BY date', [ticker, startDate, endDate])
        console.log(res)
        return res.rows
    }
}

module.exports = Queries