import { Routes, Route } from "react-router-dom";
// import Promoters from './components/Promoters/Promoters.js'
import Promoters from "./components/Promoters/Promoters.js";
import Participants from './components/Participants/Participants'
import Login  from "./components/Login/Login.js";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.js";
import Signup from "./components/Signup/Signup.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Participants />} />
      <Route path="/promoters" element={<ProtectedRoute><Promoters /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
