import Plot from 'react-plotly.js'

export function ChartPlotter({chartData}) {
    const chartTicker = chartData[0]?.ticker || ''
    const PriceVal = chartData.map(data => data.close)
    const TimeVal = chartData.map(data => data.date)

    return (
        <div>
            I am chart plotter
            <Plot
                data={[
                    {
                        x: TimeVal,
                        y: PriceVal,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout={{width: 640, height: 480, title: `Price of: ${chartTicker}`}}
            />
        </div>
    )
}