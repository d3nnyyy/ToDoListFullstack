import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCalendar, AiOutlineCheckCircle, AiOutlinePlus } from 'react-icons/ai';
import { GoCheckCircle } from 'react-icons/go';
import { format, isToday, isTomorrow, addDays, isWithinInterval, isYesterday, isBefore } from 'date-fns';

export default function Today() {
     const [items, setItems] = React.useState([]);

     useEffect(() => {
          loadItems();
     }, []);

     const loadItems = async () => {
          const result = await axios.get('http://localhost:8080/todo/today');
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

     const undoneItems = items.filter(item => !item.done);

     if (undoneItems.length === 0) {
          return (
               <div className="container-fluid py-4 bg-dark d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="text-white">
                         <h2>No tasks for today</h2>
                         <p>Start adding tasks to stay organized.</p>
                         <div style={{ fontSize: '5em' }}>
                              <AiOutlineCalendar />
                         </div>
                    </div>
                    <div className="mt-4">
                         <Link className="btn btn-outline-light me-2" to="/">
                              <AiOutlineCheckCircle className="me-2" />
                              Check All Tasks
                         </Link>
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
                    {undoneItems.map((item, index) => (
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
          </div>

     );
}
