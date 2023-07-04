import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineCalendar, AiOutlinePlus } from 'react-icons/ai';
import { GoCheckCircle } from 'react-icons/go';
import { format, isToday, isTomorrow, addDays, isWithinInterval, isYesterday, isBefore } from 'date-fns';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function Today({ searchQuery, updateTaskCount }) {

     const [items, setItems] = useState([]);
     const [taskCount, setTaskCount] = useState(0);

     const today = new Date();
     const sevenDaysFromNow = addDays(today, 7);

     const DEADLINE_COLORS = {
          todayColor: '#66BB6A',
          tomorrowColor: '#f5c842',
          withinSevenDaysColor: '#4A90E2',
          beforeColor: '#C00C00',
          defaultColor: '#CCC',
     };

     const PRIORITY_COLORS = {
          1: '#FF5757',
          2: '#F5A623',
          3: '#4A90E2',
          defaultColor: '#CCC',
     };

     useEffect(() => {
          loadItems();
     }, []);

     useEffect(
          () => {
               updateTaskCount(taskCount);
          }, [taskCount]);

     const loadItems = async () => {
          const result = await axios.get('http://localhost:8080/todo/today');
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

          if (isToday(deadline)) {
               return DEADLINE_COLORS.todayColor;
          } else if (isTomorrow(deadline)) {
               return DEADLINE_COLORS.tomorrowColor;
          } else if (isWithinInterval(deadline, { start: today, end: sevenDaysFromNow })) {
               return DEADLINE_COLORS.withinSevenDaysColor;
          } else if (isBefore(deadline, today)) {
               return DEADLINE_COLORS.beforeColor;
          } else {
               return DEADLINE_COLORS.defaultColor;
          }
     };


     const getPriorityColor = (priority) => {

          switch (priority) {
               case 1:
                    return PRIORITY_COLORS[1];
               case 2:
                    return PRIORITY_COLORS[2];
               case 3:
                    return PRIORITY_COLORS[3];
               default:
                    return PRIORITY_COLORS.defaultColor;
          }

     };


     const filteredItems = items.filter(
          (item) => !item.done && item.title.toLowerCase().includes(searchQuery.toLowerCase())
     );

     if (filteredItems.length === 0) {

          // NO TASKS TO DO

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

               {/* LIST OF TASKS */}

               <ul className="list-group mb-2 col-8">
                    {filteredItems.map((item, index) => (
                         <li key={index} className="list-group-item bg-dark">
                              <div className="d-flex justify-content-between align-items-center text-white">
                                   <div className="d-flex">

                                        {/* MARK AS DONE BUTTON */}

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

                                        {/* TASK TITLE AND DEADLINE */}

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

                                   {/* EDIT, VIEW, DELETE BUTTONS */}

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
          </div >
     );
}
