import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaEdit } from 'react-icons/fa';

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
                <div className="container-fluid py-4 bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
                        <div className="col-8">
                                <div className="card border-light mb-3 bg-dark text-light">
                                        <div className="card-header border-light">
                                                <h1 className="mb-0">{task.title}</h1>
                                        </div>

                                        {/* TASK INFO */}

                                        <div className="card-body">
                                                <p className="card-text"><strong>Description:</strong> {task.description}</p>
                                                <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
                                                <p className="card-text"><strong>Priority:</strong> {task.priority}</p>
                                        </div>

                                        {/* BUTTONS */}

                                        <div className="card-footer">
                                                <Link className="btn btn-outline-light me-2" to="/">
                                                        <FaArrowAltCircleLeft /> Back
                                                </Link>
                                                <Link className="btn btn-outline-light" to={`/editTask/${task.id}`}>
                                                        <FaEdit /> Edit Task
                                                </Link>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
