import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


export default function ViewTask() {
        const { id } = useParams();
        const [task, setTask] = useState(null);

        useEffect(() => {
                fetchTask();
        }, []);

        const fetchTask = async () => {
                try {
                        const response = await axios.get(`http://localhost:8080/todo/${id}`);
                        setTask(response.data);
                } catch (error) {
                        console.error('Error:', error);
                }
        };

        if (!task) {
                return <div>Loading...</div>;
        }

        return (
                <div className="container bg-dark">
                        <div className="py-4 bg-dark ms-2">
                                <div className="card border-light mb-3 bg-dark text-light">
                                        <div className="card-header border-light">
                                                <h5 className="mb-0">{task.title}</h5>
                                        </div>
                                        <div className="card-body">
                                                <h5 className="card-title">Task Details</h5>
                                                <p className="card-text">Description: {task.description}</p>
                                                <p className="card-text">Deadline: {task.deadline}</p>
                                                <p className="card-text">Priority: {task.priority}</p>
                                                <p className="card-text">
                                                        Status: {task.done ? <span className="text-success">Completed</span> : <span className="text-danger">Pending</span>}
                                                </p>
                                                {task.done && (
                                                        <p className="card-text">Completed Date: {task.completedDate}</p>
                                                )}
                                        </div>
                                        <div className="card-footer">
                                                <Link className="btn btn-outline-light me-2" to="/">
                                                        Back
                                                </Link>
                                                <Link className="btn btn-outline-warning" to={`/editTask/${task.id}`}>
                                                        Edit Task
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </div>
        );

}
