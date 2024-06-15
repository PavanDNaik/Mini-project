import "./App.css";
import FeatureSection from "./components/FeatureSection";
import LandingPage from "./pages/LandingPage";
import TextSummarizer from "./pages/TextSummarizer";
import ContactUs from "./pages/ContactUs";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='contactus' element={<ContactUs />} />
        <Route path='textSum' element={<TextSummarizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
