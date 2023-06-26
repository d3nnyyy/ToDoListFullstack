import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Today from './pages/Today';
import AddTask from './pages/AddTask';

function App() {
  return (
    <div className="App bg-dark vh-100">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/today" element={<Today />} />
          <Route exact path="/addTask" element={<AddTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
