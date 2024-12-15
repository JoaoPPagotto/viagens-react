import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/PageDriver";
import Page2 from "./pages/PageVehicle";
import Page3 from "./pages/PageTravel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagedriver" element={<Page1 />} />
        <Route path="/pagevehicle" element={<Page2 />} />
        <Route path="/pagetravel" element={<Page3 />} />
      </Routes>
    </Router>
  );
};

export default App;
