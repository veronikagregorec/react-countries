import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

function App() {
  return (
    <>
      <div className="header">
        <div className="container">
          <h2>Countries</h2>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:id" element={<CountryInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
