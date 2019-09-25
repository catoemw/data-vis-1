import React from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StoreMap, LoanTable, EarthquakeMap } from "./routes";


const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Route path="/" exact component={StoreMap} />
        <Route path="/loan-table" component={LoanTable} />
        <Route path="/earthquake-map" component={EarthquakeMap} />
      </Router>
    </div>
  );
}

export default App;
