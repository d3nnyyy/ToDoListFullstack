import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TasksDoneToday() {
        const [tasks, setTasks] = useState([]);

        useEffect(() => {
                const fetchTasksDoneToday = async () => {
                        try {
                                const response = await axios.get('http://localhost:8080/todo/tasks/done-today');
                                setTasks(response.data);
                        } catch (error) {
                                console.error('Error:', error);
                        }
                };

                fetchTasksDoneToday();
        }, []);

        return (
                <div>
                        <h2>Tasks Done Today</h2>
                        <ul>
                                {tasks.map(task => (
                                        <li key={task.id}>{task.title}</li>
                                ))}
                        </ul>
                </div>
        );
}
