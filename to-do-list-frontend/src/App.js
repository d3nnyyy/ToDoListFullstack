import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Today from './pages/Today';
import AddTask from './pages/AddTask';
import Navbar from './layout/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    fetchTaskCount();
  }, []);

  const fetchTaskCount = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todo/done-today');
      setTaskCount(response.data.length);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App bg-dark vh-100">
      <Router>
        <Navbar taskCount={taskCount} />
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
