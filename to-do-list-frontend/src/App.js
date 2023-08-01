import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Today from './pages/Today';
import AddTask from './pages/AddTask';
import Navbar from './layout/Navbar';
import axios from 'axios';
import ViewTask from './pages/ViewTask';
import EditTask from './pages/EditTask';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      const response = await axios.get('http://todolist.eu-central-1.elasticbeanstalk.com/todo');
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
          <Route exact path="/today" element={<Today searchQuery={searchQuery} updateTaskCount={fetchTaskCount} />} />
          <Route exact path="/addTask" element={<AddTask />} />
          <Route exact path="/viewTask/:id" element={<ViewTask />} />
          <Route exact path='/editTask/:id' element={<EditTask />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
