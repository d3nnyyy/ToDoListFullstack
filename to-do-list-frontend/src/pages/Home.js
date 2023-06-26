import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
     const [items, setItems] = React.useState([]);

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
          await axios.put(`http://localhost:8080/todo/${id}`, { done: true, completedDate: new Date() });
          loadItems();
     };

     const filteredItems = items.filter((item) => !item.done);

     return (
          <div className="container bg-dark">
               <div className="py-4 bg-dark">
                    <ul className="list-group border shadow bg-dark">
                         {filteredItems.map((item, index) => (
                              <li key={index} className="list-group-item bg-dark text-light">
                                   <div className="d-flex justify-content-between">
                                        <div>
                                             <h5>{item.title}</h5>
                                             <p>Deadline: {item.deadline}</p>
                                             <p>Priority: {item.priority}</p>
                                        </div>
                                        <div>
                                             <Link className="btn btn-dark border-white mx-2" to={`/viewuser/${item.id}`}>
                                                  View
                                             </Link>
                                             <Link className="btn btn-dark border-white mx-2" to={`/edituser/${item.id}`}>
                                                  Edit
                                             </Link>
                                             <button className='btn btn-success mx-2' onClick={() => markAsDone(item.id)}>
                                                  Done
                                             </button>
                                             <button className="btn btn-danger mx-2" onClick={() => deleteItem(item.id)}>
                                                  Delete
                                             </button>
                                        </div>
                                   </div>
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
}
