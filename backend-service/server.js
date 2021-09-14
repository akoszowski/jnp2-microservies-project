const express = require('express')
const redis = require('redis')
const Queries = require("../backend-service/database/queries");

const REDIS_URL = 'redis://:p77350001bad129c4cdc387b44cb4907222e70ef945689fa345c89c3577f567fe@ec2-46-137-29-64.eu-west-1.compute.amazonaws.com:31590'

const app = express()

const subscriber = redis.createClient(REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
})


let curPrices = []

subscriber.on('message', (channel, message) => {
    curPrices = JSON.parse(message)
    console.log(curPrices)
})

subscriber.subscribe('tracker-update')

app.get('/tickers', async (req, res) => {
    console.log('Sending available tickers')

    try {
        const tickers = await Queries.getTickers()

        console.log('Tickers fetched')

        res.send(tickers)
    } catch (err) {
        console.log('Error fetching tickers: ', err)

        res.send.status(400)
    }
})

app.get('/curPrices', (req, res) => {
    console.log('Ah, sending response!')
    res.send(curPrices)
})

app.get('/historicalPrices', async (req, res) => {
    console.log('Historical prices: ', req.query)
    const startDate = req.query.startDate
    const endDate = req.query.endDate

    try {
        const data = await Queries.getPricesInBetween(startDate, endDate)

        console.log('Historical data fetched')

        res.send(data)
    } catch (err) {
        console.log('Error fetching historical data: ', err)

        res.send.status(400)
    }
})

app.listen(5000, () => {
    console.log('M2 is listening to PORT 5000')
})
