import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Today from './pages/Today';
import AddTask from './pages/AddTask';
import Navbar from './layout/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TasksDoneToday from './pages/TasksDoneToday';
import ViewTask from './pages/ViewTask';

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
    <div className="App bg-dark vh-200">
      <Router>
        <Navbar taskCount={taskCount} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/done-today" element={<TasksDoneToday />} />
          <Route exact path="/today" element={<Today />} />
          <Route exact path="/addTask" element={<AddTask />} />
          <Route exact path="/viewTask/:id" element={<ViewTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
