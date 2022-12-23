import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Candidate from './components/Candidate/Candidate';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/home/:id" element={<Candidate/>} />          
        </Routes>
      </div>
    </Router>
  )
}

export default App
