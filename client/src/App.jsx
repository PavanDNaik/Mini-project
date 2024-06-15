import "./App.css";
import FeatureSection from "./components/FeatureSection";
import LandingPage from "./pages/LandingPage";
import TextSummarizer from "./pages/TextSummarizer"; // This line was added from incoming branch
import ContactUs from "./pages/ContactUs"; // This line was added from your branch

function App() {
  return (
    <div>
      <LandingPage />
      <ContactUs />  {/* This line was added from your branch */}
      <TextSummarizer />  {/* This line was added from incoming branch */}
    </div>
  );
}

export default App;

