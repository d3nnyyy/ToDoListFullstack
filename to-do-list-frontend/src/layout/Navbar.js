import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
     return (
          <div>
               <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#303030', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    <div className="container-fluid">
                         <Link className="navbar-brand text-light" to="/">ToDo</Link>
                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                         </button>
                         <div className='ms-2'>
                              <Link className="btn btn-outline-light me-2" to="/today">Today</Link>
                              <Link className="btn btn-outline-light" to="/addTask">Add task</Link>
                         </div>
                    </div>
               </nav>
          </div>
     );
}
