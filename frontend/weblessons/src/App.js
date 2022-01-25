import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import Login from "./pages/Login";
import Register from './pages/Register';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path='/' element={<Home />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
