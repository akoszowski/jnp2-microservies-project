import {PriceTracker} from "./components/PriceTracker";
import {HistoricalChart} from "./components/HistoricalChart";

function App() {
  return (
      <div>
        <h2>Stock-service</h2>
        <PriceTracker />
        <HistoricalChart/>
      </div>
  );
}

export default App;
