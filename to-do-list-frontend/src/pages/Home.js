import React, { useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCalendar, AiOutlinePlus, AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { GoCheckCircle } from 'react-icons/go';
import { format, isToday, isTomorrow, addDays, isWithinInterval, isYesterday, isBefore } from 'date-fns';
import DatePicker from 'react-datepicker';
import CustomDatePicker from '../helpers/CustomDatePicker';

import './Home.css'
import 'react-datepicker/dist/react-datepicker.css';


export default function Home({ searchQuery, updateTaskCount }) {

     const [items, setItems] = useState([]);
     const [showAddTask, setShowAddTask] = useState(false);
     const [taskCount, setTaskCount] = useState(0);
     const [newTask, setNewTask] = useState({
          title: '',
          description: '',
          deadline: '',
          priority: null,
     });
     const [deadlineError, setDeadlineError] = useState('');
     const [titleError, setTitleError] = useState('');

     const titleInputRef = useRef(null);

     useEffect(() => {
          if (showAddTask) {
               titleInputRef.current.focus();
          }
          loadItems();
     }, [showAddTask]);

     useEffect(() => {
          updateTaskCount(taskCount);
     }, [taskCount]);

     const loadItems = async () => {
          const result = await axios.get('http://localhost:8080/todo');
          setItems(result.data);
     };

     const deleteItem = (id) => {
          confirmAlert({
               title: 'Confirm Delete',
               message: 'Are you sure you want to delete this task?',
               buttons: [
                    {
                         label: 'Yes',
                         onClick: async () => {
                              await axios.delete(`http://localhost:8080/todo/${id}`);
                              loadItems();
                         }
                    },
                    {
                         label: 'No',
                         onClick: () => { }
                    }
               ]
          });
     };



     const markAsDone = async (id) => {
          await axios.put(`http://localhost:8080/todo/${id}`, {
               done: true,
               completedDate: new Date(),
          });
          loadItems();
          setTaskCount(taskCount + 1);
     };

     const getFormattedDate = (date) => {
          const today = new Date();
          const sevenDaysFromNow = addDays(today, 7);

          if (isToday(date)) {
               return 'Today';
          } else if (isTomorrow(date)) {
               return 'Tomorrow';
          } else if (isYesterday(date)) {
               return 'Yesterday';
          } else if (isWithinInterval(date, { start: today, end: sevenDaysFromNow })) {
               return format(date, 'EEEE');
          } else {
               return format(date, 'dd MMM');
          }
     };

     const getDeadlineColor = (deadline) => {
          const todayColor = '#66BB6A';
          const tomorrowColor = '#f5c842';
          const withinSevenDaysColor = '#4A90E2';
          const beforeColor = '#C00C00';
          const defaultColor = '#CCC';

          const today = new Date();
          const sevenDaysFromNow = addDays(today, 7);

          if (isToday(deadline)) {
               return todayColor;
          } else if (isTomorrow(deadline)) {
               return tomorrowColor;
          } else if (isWithinInterval(deadline, { start: today, end: sevenDaysFromNow })) {
               return withinSevenDaysColor;
          } else if (isBefore(deadline, today)) {
               return beforeColor;
          } else {
               return defaultColor;
          }
     }

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


     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setNewTask((prevTask) => ({
               ...prevTask,
               [name]: value,
          }));
     };

     // const handleInputChange = (e) => {
     //      const { name, value } = e.target;

     //      if (name === 'title') {
     //           setTitleError('');
     //      } else if (name === 'deadline') {
     //           const selectedDate = value ? new Date(value) : null;
     //           selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
     //           setNewTask((prevTask) => ({
     //                ...prevTask,
     //                deadline: selectedDate,
     //           }));
     //           setDeadlineError('');
     //           return;
     //      }

     //      setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
     // };


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

     const filteredItems = items.filter(
          (item) => !item.done && item.title.toLowerCase().includes(searchQuery.toLowerCase())
     );

     if (filteredItems.length === 0) {
          return (
               <div className="container-fluid py-4 bg-dark d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="text-white">
                         <h2>No tasks to do</h2>
                         <p>Start adding tasks to stay organized.</p>
                         <div style={{ fontSize: '5em' }}>
                              <AiOutlineCalendar />
                         </div>
                    </div>
                    <div className="mt-4">
                         <Link className="btn btn-outline-light" to="/addTask">
                              <AiOutlinePlus className="me-2" />
                              Add Task
                         </Link>
                    </div>
               </div>
          );
     }

     return (
          <div className="container-fluid py-4 bg-dark d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
               <ul className="list-group mb-2 col-8">
                    {filteredItems.map((item, index) => (
                         <li key={index} className="list-group-item bg-dark">
                              <div className="d-flex justify-content-between align-items-center text-white">
                                   <div className="d-flex">
                                        <span className="me-3 color-red">
                                             <span
                                                  className="done btn btn-circle text-white fs-5"
                                                  onClick={() => markAsDone(item.id)}
                                             >
                                                  <GoCheckCircle className='done'
                                                       style={{ color: getPriorityColor(item.priority), fontWeight: 'bold' }}
                                                  />
                                             </span>
                                        </span>
                                        <div>
                                             <h5 className="mb-1 d-flex align-items-center">
                                                  <p className="m-0">{item.title}</p>
                                             </h5>
                                             <div className={`align-items-center ${item.deadline === null ? 'd-none' : 'd-flex'}`}>
                                                  <AiOutlineCalendar style={{ color: getDeadlineColor(new Date(item.deadline)) }} />
                                                  <div className="ms-2">
                                                       <p className="m-0">
                                                            <span
                                                                 className="me-1"
                                                                 style={{ color: getDeadlineColor(new Date(item.deadline)) }}
                                                            >
                                                                 {getFormattedDate(new Date(item.deadline))}
                                                            </span>
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
                         className="btn btn-transparent text-white fs-3 me-2"
                         onClick={() => setShowAddTask(true)}
                    >
                         <style>
                              {`
                              .btn-transparent {
                              background-color: transparent;
                              border: none;
                              cursor: pointer;
                              transition: all 0.3s ease;
                              }

                              .btn-transparent:hover {
                              transform: scale(1.1);
                              }
                         `}
                         </style>
                         <AiOutlinePlus />
                         <span className="ms-2">Add Task</span>
                    </button>
               </div>


               {showAddTask && (
                    <div className="card text-white mb-3 bg-dark col-6" style={{ border: '2px solid #343a40' }}>
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
                              <div className="mb-3 d-flex align-items-center text-dark">
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
                                   <button className="btn btn-transparent text-white fs-5" onClick={handleCancelAddTask}>
                                        <p>Cancel</p>
                                   </button>
                              </div>
                         </div>
                    </div>
               )
               }
          </div >
     );
}
