import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CustomDatePicker from '../helpers/CustomDatePicker';
import { addDays } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

export default function AddTask() {
     const navigate = useNavigate();
     const [showAddTask, setShowAddTask] = useState(false);
     const [items, setItems] = useState([]);
     const [newTask, setNewTask] = useState({
          title: '',
          description: '',
          deadline: '',
          priority: 1,
     });
     const [deadlineError, setDeadlineError] = useState('');
     const [titleError, setTitleError] = useState('');

     const loadItems = async () => {
          const result = await axios.get('http://localhost:8080/todo');
          setItems(result.data);
     };

     const titleInputRef = useRef(null);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          if (name === 'title') {
               setTitleError('');
          } else if (name === 'deadline') {
               setNewTask((prevTask) => ({ ...prevTask, deadline: value }));
               setDeadlineError('');
               return;
          }
          setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
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

     const handleCancelAddTask = () => {
          setNewTask({
               title: '',
               description: '',
               deadline: '',
               priority: 1,
          });
          setShowAddTask(false);
     };

     const handleResetDeadline = () => {
          setNewTask((prevTask) => ({
               ...prevTask,
               deadline: '',
          }));
          setDeadlineError('');
     };
     const handleAddTask = async (e) => {
          if (newTask.title.trim() === '') {
               setTitleError('Please enter a title for the task.');
               return;
          }

          const today = new Date();
          const yesterday = addDays(today, -1);
          if (newTask.deadline && new Date(newTask.deadline) < yesterday) {
               setDeadlineError('Invalid deadline. Please select a future date.');
               return;
          }

          const taskToAdd = {
               ...newTask,
               deadline: newTask.deadline.trim() !== '' ? new Date(newTask.deadline.trim()) : null,
          };

          await axios.post('http://localhost:8080/todo', taskToAdd);

          setNewTask({
               title: '',
               description: '',
               deadline: '',
               priority: 1,
          });

          loadItems();
          navigate('/');
     };

     useEffect(() => {
          titleInputRef.current.focus();
     }, []);

     useEffect(() => {
          document.body.style.overflow = 'hidden';
          return () => {
               document.body.style.overflow = 'auto';
          };
     }, []);

     return (
          <div className="position-relative top-0 start-0 w-100 h-100 vh-100 d-flex align-items-center justify-content-center overflow-hidden">
               <div className="col-8">
                    <h1 className="text-white mb-4">Add Task</h1>
                    <div className="card text-white mb-3 bg-dark" style={{ border: '2px solid #343a40' }}>
                         <div className="card-body">
                              <div className="mb-3">
                                   <input
                                        type="text"
                                        className={`form-control bg-transparent text-white placeholder-color ${titleError ? 'is-invalid' : 'border-0'
                                             }`}
                                        name="title"
                                        placeholder="Task Title"
                                        value={newTask.title}
                                        onChange={handleInputChange}
                                        ref={titleInputRef}
                                   />
                                   {titleError && <p className="invalid-feedback">{titleError}</p>}
                              </div>
                              <div className="mb-3">
                                   <input
                                        className="form-control border-0 bg-transparent text-white placeholder-color"
                                        name="description"
                                        placeholder="Task Description"
                                        value={newTask.description}
                                        onChange={handleInputChange}
                                   ></input>
                              </div>
                              <div className="mb-3 text-white date-input-container d-flex align-items-center">
                                   <CustomDatePicker newTask={newTask} handleInputChange={handleInputChange} />
                                   {newTask.deadline && (
                                        <button className="reset-date-button" onClick={handleResetDeadline}>
                                             <AiOutlineCloseCircle />
                                        </button>
                                   )}
                              </div>
                              {deadlineError && <p className="text-danger">{deadlineError}</p>}
                              <div className='mb-3 text-white d-flex p-2'>
                                   <div>Priority</div>
                                   <div className='ms-3'>
                                        {[1, 2, 3, 4].map(value => (
                                             <div key={value} className='form-check-inline'>
                                                  <input
                                                       className='form-check-input'
                                                       type='radio'
                                                       name='priority'
                                                       value={value}
                                                       checked={newTask.priority === String(value)}
                                                       onChange={e => handleInputChange(e)}
                                                       style={{ backgroundColor: newTask.priority === String(value) ? getPriorityColor(value) : '' }}
                                                  />
                                                  <label className='form-check-label'>{value}</label>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              <div className="text-end">
                                   <button className="btn btn-transparent me-2 text-white fs-5" onClick={handleAddTask}>
                                        <p>Add task</p>
                                   </button>
                                   <Link className="btn btn-transparent text-white fs-5" to={"/"} onClick={handleCancelAddTask}>
                                        <p>Cancel</p>
                                   </Link>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
