const express = require('express')
const redis = require('redis')
const axios = require('axios');
const tickers = require("./tickers");
const Queries = require("./database/queries");

const token = '528fdcbeab906f771da5f05426dad52e985e87f8'
const API_URL = `https://api.tiingo.com/tiingo/crypto/prices?tickers=${tickers.toString()}&token=${token}&resampleFreq=`
const REDIS_URL = 'redis://:p77350001bad129c4cdc387b44cb4907222e70ef945689fa345c89c3577f567fe@ec2-46-137-29-64.eu-west-1.compute.amazonaws.com:31590'

const app = express()

const publisher = redis.createClient(REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
})

// Every 1 min we update live tracker
// Every 20 mins we put data into db

async function flushData() {
    try {
       await Queries.flushData()
       console.log('Database flushed')
   } catch (err) {
        console.log('Error flushing database: ', err)
   }
}

async function fetchHistoricalData(resampleFreq, startDate, endDate) {
    const request_URL = API_URL + resampleFreq + '&startDate=' + startDate + '&endDate=' + endDate

    console.log('Fetching historical data')

    try {
        const res = await axios.get(request_URL)

        console.log('Historical data fetched')
        console.log('Length: ', res.data.length)

        res.data.map(tickerInfo => {
            const ticker = tickerInfo.ticker
            const priceData = tickerInfo.priceData

            priceData.map(priceInfo => {
                const close = priceInfo.close
                const date = new Date(priceInfo.date)

                // console.log(ticker, priceData, date, close)

                Queries.pushTickerData(ticker, close, date).then(res => {
                    console.log('Data from: ', date)
                }).catch(err => {
                    console.log('Error pushing historical data: ', err)
                })
            })
        })
    } catch(err) {
        console.log('Error fetching historical data: ', err)
    }
}

function fetchLiveData(resampleFreq) {
    let liveData = []
    const request_URL = API_URL + resampleFreq

    console.log('Fire!')

    axios.get(request_URL).then(res => {
        res.data.map(info => {
            const ticker = info.ticker
            const priceData = info.priceData.slice(-1)
            const date = new Date(priceData[0].date)
            const close = priceData[0].close

            console.log(ticker, priceData, date, close)

            if (date.getMinutes() % 60 === 0) {
                Queries.pushTickerData(ticker, close, date).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }

            console.log('Live tracker push')

            let tickerData = {
                ticker: ticker,
                price: close,
            }

            liveData.push(tickerData)
        })

        publisher.publish('tracker-update', JSON.stringify(liveData))
    }).catch(err => {
        console.log('Fetch crypto data error: ', err)
    })
}

app.listen(6000, async () => {
    console.log('M1 is listening on PORT 6000')

    await flushData()

    const historicalFreq = '8hour'
    const liveFreq = '1min'
    const startDate = '2021-09-01'
    const endDate = (new Date(Date.now() + (3600 * 1000 * 24))).toISOString().split('T')[0]

    await fetchHistoricalData(historicalFreq, startDate, endDate)

    setInterval(() => { fetchLiveData(liveFreq) }, 10000)
})