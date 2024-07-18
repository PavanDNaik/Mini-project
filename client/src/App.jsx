import "./App.css";
import LandingPage from "./pages/LandingPage";
import TextSummarizer from "./pages/TextSummarizer";
import ContactUs from "./pages/ContactUs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportPage from "./pages/ReportPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/textSum' element={<TextSummarizer />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/reportpage' element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
