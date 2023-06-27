import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function AddTask() {

     let navigate = useNavigate();

     const [item, setItem] = React.useState({
          title: '',
          description: '',
          deadline: '',
          priority: '',
     })

     const [errorMessage, setErrorMessage] = React.useState('');

     const { title, description, deadline, priority } = item

     const onInputChange = e => {
          setItem({ ...item, [e.target.name]: e.target.value })
     }

     const onSubmit = async e => {
          e.preventDefault();

          const currentDate = new Date().toISOString().slice(0, 10);
          if (deadline < currentDate) {
               setErrorMessage('The deadline cannot be in the past.');
               return;
          }

          try {
               await axios.post('http://localhost:8080/todo', item);
               navigate('/');
          } catch (error) {
               if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
               } else {
                    console.error('Error:', error);
                    setErrorMessage('An error occurred while creating the task.');
               }
          }
     };

     return (
          <div className='container mt-4'>
               <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-4 shadow'>
                         <h1 className='m-4 text-white'>Add Task</h1>
                         {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                         <form onSubmit={(e) => onSubmit(e)}>
                              <div className='mb-3 text-white'>
                                   <label htmlFor='title' className="form-label">Title</label>
                                   <input type={"text"} className="form-control" name="title" value={title} onChange={(e) => onInputChange(e)} placeholder="Enter title" />
                              </div>
                              <div className='mb-3 text-white'>
                                   <label htmlFor='description' className="form-label">Description</label>
                                   <input type={"text"} className="form-control" name="description" value={description} onChange={(e) => onInputChange(e)} placeholder="Enter description" />
                              </div>
                              <div className='mb-3 text-white'>
                                   <label htmlFor='deadline' className="form-label">Deadline</label>
                                   <input type='date' className="form-control" name="deadline" value={deadline} onChange={(e) => onInputChange(e)} placeholder="Enter deadline" />
                              </div>
                              <div className='mb-3 text-white'>
                                   <label htmlFor='priority' className='form-label'>Priority</label>
                                   <div>
                                        {[1, 2, 3, 4].map(value => (
                                             <div key={value} className='form-check form-check-inline'>
                                                  <input className='form-check-input' type='radio' name='priority' value={value} checked={priority === String(value)} onChange={e => onInputChange(e)} />
                                                  <label className='form-check-label'>{value}</label>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              <button type="submit" className="btn btn-success">Submit</button>
                              <Link className="btn btn-danger mx-2" to="/">Cancel</Link>
                         </form>
                    </div>
               </div>
          </div>
     )

}
