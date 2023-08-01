import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineClose } from 'react-icons/ai';
import CustomDatePicker from '../helpers/CustomDatePicker';
import { addDays } from 'date-fns';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTask() {

        const navigate = useNavigate();
        const [items, setItems] = useState([]);
        const { id } = useParams();
        const titleInputRef = useRef(null);

        const [deadlineError, setDeadlineError] = useState('');
        const [titleError, setTitleError] = useState('');

        const today = new Date();
        const yesterday = addDays(today, -1);

        const [newTask, setNewTask] = useState({
                title: '',
                description: '',
                deadline: null,
                priority: null,
        });

        const PRIORITY_COLORS = {
                1: '#FF5757',
                2: '#F5A623',
                3: '#4A90E2',
                defaultColor: '#CCC',
        };

        useEffect(() => {
                titleInputRef.current.focus();
        }, []);

        useEffect(() => {
                loadTask();
        }, []);

        const loadTask = async () => {
                const result = await axios.get(`http://todolist.eu-central-1.elasticbeanstalk.com/todo/${id}`);
                setNewTask(result.data);
        }

        const loadItems = async () => {
                const result = await axios.get('http://todolist.eu-central-1.elasticbeanstalk.com/todo');
                setItems(result.data);
        };

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
                                return PRIORITY_COLORS[1];
                        case 2:
                                return PRIORITY_COLORS[2];
                        case 3:
                                return PRIORITY_COLORS[3];
                        default:
                                return PRIORITY_COLORS.defaultColor;
                }
        };

        const handleCancelEditTask = () => {

                setNewTask({
                        title: '',
                        description: '',
                        deadline: '',
                        priority: null,
                });
        };

        const handleResetDeadline = () => {

                setNewTask((prevTask) => ({
                        ...prevTask,
                        deadline: null,
                }));
                setDeadlineError('');
        };

        const handleEditTask = async () => {

                if (!newTask.title || newTask.title.trim() === '') {
                        setTitleError('Please enter a title for the task.');
                        return;
                }

                if (newTask.deadline && new Date(newTask.deadline) < yesterday) {
                        setDeadlineError('Invalid deadline. Please select a future date.');
                        return;
                }

                let taskToAdd = {
                        ...newTask,
                        deadline: newTask.deadline && newTask.deadline.trim() !== ''
                                ? new Date(newTask.deadline.trim()) : null,
                };

                await axios.put(`http://todolist.eu-central-1.elasticbeanstalk.com/todo/${id}`, taskToAdd);

                loadItems();
                navigate('/');
        };

        return (
                <div className="container-fluid py-4 bg-dark d-flex flex-column justify-content-center align-items-center vh-100">
                        <div className="col-8">
                                <h1 className="text-white mb-4">Edit Task</h1>
                                <div className="card text-white mb-3 bg-dark border-light" style={{ border: '2px solid #343a40' }}>
                                        <div className="card-body">

                                                {/* TITLE */}

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

                                                {/* DESCRIPTION */}

                                                <div className="mb-3">
                                                        <input
                                                                className="form-control border-0 bg-transparent text-white placeholder-color"
                                                                name="description"
                                                                placeholder="Task Description"
                                                                value={newTask.description}
                                                                onChange={handleInputChange}
                                                        ></input>
                                                </div>

                                                {/* DEADLINE */}

                                                <div className="mb-3 text-white date-input-container d-flex align-items-center">
                                                        <CustomDatePicker newTask={newTask} handleInputChange={handleInputChange} />

                                                        {newTask.deadline && (
                                                                <button className="reset-date-button" onClick={handleResetDeadline}>
                                                                        <AiOutlineCloseCircle />
                                                                </button>
                                                        )}
                                                </div>
                                                {deadlineError && <p className="text-danger">{deadlineError}</p>}

                                                {/* PRIORITY */}

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

                                                {/* BUTTONS */}

                                                <div className="text-end">
                                                        <button className="btn btn-outline-light me-2 fs-5" onClick={handleEditTask}>
                                                                <AiOutlineCheckCircle /> Submit
                                                        </button>
                                                        <Link className="btn btn-outline-light fs-5" to={'/'} onClick={handleCancelEditTask}>
                                                                <AiOutlineClose /> Cancel
                                                        </Link>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
