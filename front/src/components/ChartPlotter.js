import Plot from 'react-plotly.js'

export function ChartPlotter({chartData}) {
    // const


    return (
        <div>
            I am chart plotter
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        // marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={{width: 640, height: 480, title: 'Crypto prices'}}
            />
        </div>
    )
}