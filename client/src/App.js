import { Routes, Route, useNavigate } from "react-router-dom";
// import Promoters from './components/Promoters/Promoters.js'
import { Button } from "semantic-ui-react";
import Promoters from "./components/Promoters/Promoters.js";
import Participants from './components/Participants/Participants'
import Login  from "./components/Login/Login.js";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.js";
import Signup from "./components/Signup/Signup.js";
import "./App.css"
import Event from "./components/Event/Event.js";

function App() {
  const navigate = useNavigate()
  const pathName = window.location.pathname
  console.log(pathName)
  return (
    <>
      {pathName !=="/login" && pathName!=="/signup"?(<nav className="navBar">
          <p className="title">PURCycling</p>
          <Button className="btn" onClick={()=>{navigate("signup")}}>SignUp</Button>
      </nav>):null}
      <Routes>
        <Route path="/" element={<Participants />} />
        <Route path="/promoters" element={<ProtectedRoute><Promoters /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/event/id" element={<ProtectedRoute><Event/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
