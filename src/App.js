import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import { Typography, Box } from "@mui/material";

function App() {
  return (
    <>
      <Box className="header">
        <Box className="container">
          <Typography variant="h2">Countries</Typography>
        </Box>
      </Box>
      <Box className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:id" element={<CountryInfo />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
