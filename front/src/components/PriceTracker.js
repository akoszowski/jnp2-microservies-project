import {useEffect, useState} from "react";
import axios from "axios";
import {LivePrice} from "./LivePrice";

export function PriceTracker() {
    const [tickersData, setTickersData] = useState([])

    const timeout = 10000

    const fetchPrice = async () => {
        // axios.get('/curPrices').then(res => {
        //     console.log(res.data)
        //     setTickersData(res.data)
        //     console.log(tickersData)
        // }).catch(err => {
        //     console.log(err)
        // })

        const res = await axios.get('/curPrices')

        console.log('Updated tickers')
        console.log(res.data)
        setTickersData(res.data)
    }

    useEffect(() => {
        const id = setInterval(fetchPrice, timeout)

        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        console.log('Ticker data:')
        console.log(tickersData)
    })

    return (
        <div>
            <p>I am tracker</p>
            {tickersData.map(tickerData => {
                return (
                    <div>
                        <LivePrice name={tickerData.ticker}/>
                    </div>
                )
            })}
            <p>I am plot</p>
        </div>
    )

}