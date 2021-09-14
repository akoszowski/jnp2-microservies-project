import {DateChooser} from "./DateChooser";
import {ChartPlotter} from "./ChartPlotter";
import {useEffect, useState} from "react";
import axios from "axios";

export function HistoricalChart() {
    const [tickers, setTickers] = useState([])
    const [chartTicker, setChartTicker] = useState('xrpusd')
    const [startDate, setStartDate] = useState(new Date('2021-09-01'))
    const [endDate, setEndDate] = useState(new Date('2021-09-10'))
    const [chartData, setChartData] = useState([])

    async function fetchTickers() {
        const res = await axios.get('/tickers')

        console.log('Tickers: ', res.data)

        setTickers(res.data)
    }

    async function fetchChartData() {
        console.log(`Fetch chart data with ticker: ${chartTicker} startDate: ${startDate.toISOString()} endDate: ${endDate.toISOString()}`)
        const res = await axios.get('/historicalPrices', {params: {chartTicker: chartTicker, startDate: startDate, endDate: endDate}})

        console.log(res.data)
        setChartData(res.data)
    }

    useEffect(() => {
        fetchTickers().then(res => {
            console.log('Tickers fetched')
        }).catch(err => {
            console.log('Error fetching tickers: ', err)
        })
    }, [])


    return (
        <div align="center">
            <DateChooser startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <select value={chartTicker} onChange={(e) => setChartTicker(e.target.value)} disabled={!tickers}>
                {tickers.map(ticker => {
                    return (
                        <option value={ticker.ticker}>{ticker.ticker}</option>
                    )
                })}
            </select>
            <button type="submit" onClick={async () => fetchChartData()} >Plot Data</button><br/>
            {chartData.length !== 0 ? <ChartPlotter chartData={chartData}/> : <></>}
        </div>
    )
}