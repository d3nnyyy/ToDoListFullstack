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
import EditTask from './pages/EditTask';


function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [taskCount, setTaskCount] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
        <Navbar taskCount={taskCount} onSearch={handleSearch} />
        <Routes>
          <Route exact path="/" element={<Home searchQuery={searchQuery} updateTaskCount={fetchTaskCount} />} />
          <Route exact path="/done-today" element={<TasksDoneToday />} />
          <Route exact path="/today" element={<Today />} />
          <Route exact path="/addTask" element={<AddTask />} />
          <Route exact path="/viewTask/:id" element={<ViewTask />} />
          <Route exact path='/editTask/:id' element={<EditTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
