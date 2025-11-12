import { HashRouter as Router, Routes, Route } from "react-router-dom";
import IntroducingHealthCarePage from "./IntroducingHealthCarePage";
import LoginPage from "./LoginPage";
import ChatPage from "./ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroducingHealthCarePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
