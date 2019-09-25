import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StoreMap, LoanTable, EarthquakeMap } from "./routes";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: "#00A"}
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navigation />
          <Route path="/" exact component={StoreMap} />
          <Route path="/loan-table" component={LoanTable} />
          <Route path="/earthquake-map" component={EarthquakeMap} />
        </Router>
      </div></ThemeProvider>
  );
}

export default App;
