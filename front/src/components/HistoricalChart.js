import {DateChooser} from "./DateChooser";
import {ChartPlotter} from "./ChartPlotter";
import {useEffect, useState} from "react";
import axios from "axios";

export function HistoricalChart() {
    const [startDate, setStartDate] = useState(new Date('2021-09-01'))
    const [endDate, setEndDate] = useState(new Date('2021-09-10'))
    const [chartData, setChartData] = useState([])
    const [tickers, setTickers] = useState([])

    async function fetchTickers() {
        const res = await axios.get('/tickers')

        console.log('Tickers: ', res.data)

        setTickers(res.data)
    }

    async function fetchChartData() {
        console.log(`Fetch chart data with startDate: ${startDate.toISOString()} endDate: ${endDate.toISOString()}`)
        const res = await axios.get('/historicalPrices', {params: {startDate: startDate, endDate: endDate}})

        setChartData(res.data)
    }

    useEffect(async () => {
         await fetchTickers()
    }, [])

    return (
        <div>
            I am historical chart
            <DateChooser startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <button type="submit" onClick={async () => fetchChartData()} >Plot Data</button><br/>
            <select name="tickers" disabled={!tickers}>
                {tickers.map(ticker => {
                    <option value={ticker}>{ticker}</option>
                })}
            </select>
            <ChartPlotter chartData={chartData}/>
        </div>
    )
}