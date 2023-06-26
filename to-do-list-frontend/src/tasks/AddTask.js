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

     const { title, description, deadline, priority } = item

     const onInputChange = e => {
          setItem({ ...item, [e.target.name]: e.target.value })
     }

     const onSubmit = async e => {
          e.preventDefault()
          await axios.post("http://localhost:8080/todo", item)
          navigate('/')
     }

     return (
          <div className='container'>
               <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                         <h2 className='m-4'>Add Task</h2>
                         <form onSubmit={(e) => onSubmit(e)}>
                              <div className='mb-3'>
                                   <label htmlFor='title' className="form-label">Title</label>
                                   <input type={"text"} className="form-control" name="title" value={title} onChange={(e) => onInputChange(e)} placeholder="Enter title" />
                              </div>
                              <div className='mb-3'>
                                   <label htmlFor='description' className="form-label">Description</label>
                                   <input type={"text"} className="form-control" name="description" value={description} onChange={(e) => onInputChange(e)} placeholder="Enter description" />
                              </div>
                              <div className='mb-3'>
                                   <label htmlFor='deadline' className="form-label">Deadline</label>
                                   <input type={"date"} className="form-control" name="deadline" value={deadline} onChange={(e) => onInputChange(e)} placeholder="Enter deadline" />
                              </div>
                              <div className='mb-3'>
                                   <label htmlFor='priority' className="form-label">Priority</label>
                                   <input type={"integer"} className="form-control" name="priority" value={priority} onChange={(e) => onInputChange(e)} placeholder="Enter priority" />
                              </div>
                              <button type="submit" className="btn btn-outline-primary">Submit</button>
                              <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                         </form>
                    </div>
               </div>
          </div>
     )
}
