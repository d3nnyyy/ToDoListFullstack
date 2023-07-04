import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { MdToday } from 'react-icons/md';

export default function Navbar({ taskCount, onSearch }) {

     const handleInputChange = (event) => {
          const query = event.target.value;
          onSearch(query);
     };

     return (
          <nav
               className="navbar navbar-expand-lg navbar-dark bg-dark"
               style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
               <div className="container">
                    <div className={`collapse navbar-collapse`}>
                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                   <Link className="nav-link" to="/">
                                        <AiOutlineHome className="text-light" />
                                        Home
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link className="nav-link" to="/today">
                                        <MdToday className="text-light" />
                                        Today
                                   </Link>
                              </li>
                         </ul>
                         <div className="d-flex align-items-center">
                              <span className="text-light me-3">Done Today: {taskCount}</span>
                              <form className="d-flex">
                                   <div className="input-group">
                                        <input
                                             className="form-control"
                                             type="search"
                                             placeholder="Search"
                                             aria-label="Search"
                                             onChange={handleInputChange}
                                        />
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               <Link className="btn btn-transparent me-4 fs-4" to="/addTask">
                    <IoMdAdd className="text-light" />
               </Link>
          </nav>
     );
}
