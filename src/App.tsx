import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import LoggedIn from "./pages/loggedin";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/loggedin" element={<LoggedIn />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
