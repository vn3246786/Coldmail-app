import { Navigate, Route,BrowserRouter as Router, Routes } from "react-router-dom"
import "./app.scss"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Home from "./Pages/Home/Home"
import NewSequence from "./Pages/NewSequence/NewSequence"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react"
import { UserContext } from "./Contexts/UserContext/UserContext"


function App() {

  const {User}=useContext(UserContext)

  return (
    <div className="app">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={User?<Home/>:<Navigate to={"/login"}/>}/>
          <Route path="/new-sequence" element={<NewSequence/>}/>
          <Route path="/login" element={User?<Navigate to={"/"}/>:<Login/>}/>
          <Route path="/register" element={User?<Navigate to={"/"}/>:<Register/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
