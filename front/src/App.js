import {PriceTracker} from "./components/PriceTracker";
import {HistoricalChart} from "./components/HistoricalChart";

import '@fontsource/roboto';
import {AppBar, Typography} from "@material-ui/core";

function App() {
  return (
      <div>
        <AppBar position="static">
            <Typography align="center" variant="h4" >
                Stock microservices project
            </Typography>
        </AppBar>
        <PriceTracker />
        <HistoricalChart/>
      </div>
  );
}

export default App;
