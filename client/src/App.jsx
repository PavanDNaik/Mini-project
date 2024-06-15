import "./App.css";
import FeatureSection from "./components/FeatureSection";
import LandingPage from "./pages/LandingPage";
import TextSummarizer from "./pages/TextSummarizer"; 
import ContactUs from "./pages/ContactUs"; 

function App() {
  return (
    <div>
      <LandingPage />
      <ContactUs />  
      <TextSummarizer /> 
    </div>
  );
}

export default App;

