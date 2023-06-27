import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCalendar, AiOutlinePlus } from 'react-icons/ai';
import { GoCheckCircle } from 'react-icons/go';
import { format, isToday, isTomorrow } from 'date-fns';

export default function Home() {
     const [items, setItems] = useState([]);
     const [showAddTask, setShowAddTask] = useState(false);
     const [newTask, setNewTask] = useState({
          title: '',
          description: '',
          deadline: '',
          priority: 1,
     });

     useEffect(() => {
          loadItems();
     }, []);

     const loadItems = async () => {
          const result = await axios.get('http://localhost:8080/todo');
          setItems(result.data);
     };

     const deleteItem = async (id) => {
          await axios.delete(`http://localhost:8080/todo/${id}`);
          loadItems();
     };

     const markAsDone = async (id) => {
          await axios.put(`http://localhost:8080/todo/${id}`, {
               done: true,
               completedDate: new Date(),
          });
          loadItems();
     };

     const getFormattedDate = (date) => {
          if (isToday(date)) {
               return 'Today';
          } else if (isTomorrow(date)) {
               return 'Tomorrow';
          } else {
               return format(date, 'dd MMM');
          }
     };

     const getPriorityColor = (priority) => {
          switch (priority) {
               case 1:
                    return '#FF5757';
               case 2:
                    return '#F5A623';
               case 3:
                    return '#4A90E2';
               default:
                    return '#CCC';
          }
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
     };

     const handleAddTask = async (e) => {
          await axios.post('http://localhost:8080/todo', newTask);

          setNewTask({
               title: '',
               description: '',
               deadline: '',
               priority: 1,
          });

          setShowAddTask(false);
          loadItems();
     };

     const handleCancelAddTask = () => {
          setNewTask({
               title: '',
               description: '',
               deadline: '',
               priority: 1,
          });

          setShowAddTask(false);
     };


     const filteredItems = items.filter((item) => !item.done);

     return (
          <div className="container py-4">
               <ul className="list-group mb-2">
                    {filteredItems.map((item, index) => (
                         <li key={index} className="list-group-item bg-dark">
                              <div className="d-flex justify-content-between align-items-center text-white">
                                   <div className="d-flex">
                                        <span className="me-3 color-red">
                                             <span
                                                  className="btn btn-circle text-white fs-5"
                                                  onClick={() => markAsDone(item.id)}
                                             >
                                                  <GoCheckCircle
                                                       style={{ color: getPriorityColor(item.priority), fontWeight: 'bold' }}
                                                  />
                                             </span>
                                        </span>
                                        <div>
                                             <h5 className="mb-1 d-flex align-items-center">
                                                  <p className="m-0">{item.title}</p>
                                             </h5>
                                             <div className="d-flex align-items-center">
                                                  <AiOutlineCalendar />
                                                  <div className="ms-2">
                                                       <p className="m-0">
                                                            <span className="me-1">{getFormattedDate(new Date(item.deadline))}</span>
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div>
                                        <Link className="me-3 text-white fs-5" to={`/viewTask/${item.id}`}>
                                             <AiOutlineEye />
                                        </Link>
                                        <Link className="me-3 text-white fs-5" to={`/editTask/${item.id}`}>
                                             <AiOutlineEdit />
                                        </Link>
                                        <button
                                             className="btn btn-transparent text-white fs-5"
                                             onClick={() => deleteItem(item.id)}
                                        >
                                             <AiOutlineDelete />
                                        </button>
                                   </div>
                              </div>
                         </li>
                    ))}
               </ul>

               <div className="mb-3 d-flex align-items-center">
                    <button
                         className="btn btn-transparent text-white fs-5 me-2"
                         onClick={() => setShowAddTask(true)}
                    >
                         <AiOutlinePlus />
                    </button>
                    <h4 className="text-white mb-0">Add Task</h4>
               </div>

               {showAddTask && (
                    <div className="card mb-3">
                         <div className="card-body">
                              <h5 className="card-title">New Task</h5>
                              <div className="mb-3">
                                   <label className="form-label">Title</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={newTask.title}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="mb-3">
                                   <label className="form-label">Description</label>
                                   <textarea
                                        className="form-control"
                                        name="description"
                                        value={newTask.description}
                                        onChange={handleInputChange}
                                   ></textarea>
                              </div>
                              <div className="mb-3">
                                   <label className="form-label">Deadline</label>
                                   <input
                                        type="text"
                                        className="form-control"
                                        name="deadline"
                                        value={newTask.deadline}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="mb-3">
                                   <label className="form-label">Priority</label>
                                   <select
                                        className="form-select"
                                        name="priority"
                                        value={newTask.priority}
                                        onChange={handleInputChange}
                                   >
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                   </select>
                              </div>
                              <button className="btn btn-primary me-2" onClick={handleAddTask}>
                                   Add Task
                              </button>
                              <button className="btn btn-secondary" onClick={handleCancelAddTask}>
                                   Cancel
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
}
