import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineHome, AiOutlineCheckCircle } from 'react-icons/ai';
import { RiTodoLine } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';

export default function Navbar({ taskCount }) {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     return (
          <nav
               className="navbar navbar-expand-lg navbar-dark bg-dark"
               style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
               <div className="container">
                    <button
                         className="navbar-toggler text-light"
                         type="button"
                         onClick={toggleMenu}
                         aria-label="Toggle navigation"
                    >
                         <AiOutlineMenu />
                    </button>
                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                   <Link className="nav-link" to="/">
                                        <AiOutlineHome className="text-light" />
                                        Home
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link className="nav-link" to="/tasks">
                                        <RiTodoLine className="text-light" />
                                        Tasks
                                   </Link>
                              </li>
                              <li className="nav-item">
                                   <Link className="nav-link" to="/today">
                                        <AiOutlineCheckCircle className="text-light" />
                                        Today
                                   </Link>
                              </li>
                         </ul>
                         <div className="d-flex align-items-center">
                              <span className="text-light me-3">Done Today: {taskCount}</span>
                              <form className="d-flex">
                                   <div className="input-group">
                                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-light text-dark" type="submit">
                                             <AiOutlineSearch />
                                        </button>
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
