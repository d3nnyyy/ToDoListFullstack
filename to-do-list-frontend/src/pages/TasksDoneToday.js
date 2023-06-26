import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TasksDoneToday() {
        const [items, setItems] = useState([]);

        useEffect(() => {
                const fetchTasksDoneToday = async () => {
                        try {
                                const response = await axios.get('http://localhost:8080/todo/done-today');
                                setItems(response.data);
                        } catch (error) {
                                console.error('Error:', error);
                        }
                };

                fetchTasksDoneToday();
        }, []);

        const doneItems = items.filter(item => item.done);

        return (
                <div className="container bg-dark">
                        <div className="py-4 bg-dark">
                                <ul className="list-group border shadow bg-dark">
                                        {doneItems.map((item, index) => (
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
                                                                </div>
                                                        </div>
                                                </li>
                                        ))}
                                </ul>
                        </div>
                </div>
        );
}
