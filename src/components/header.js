import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Logout from './logout';

class Header extends Component {
    constructor(props) {
        super(props);
        var isLogin = false;
        if(localStorage.getItem('token')){
            isLogin = true;
        }
        this.state = { isLogin: isLogin}
    }
    render() { 
        return (  
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">To Do</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        { 
                            this.state.isLogin
                            ? 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/todo">ToDo</Link>
                                </li>
                            : ''
                        }
                        { 
                            this.state.isLogin
                            ? 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Create</Link>
                                </li>
                            : ''
                        }
                        { 
                            this.state.isLogin
                            ? ''
                            : 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                        }
                        { 
                            this.state.isLogin
                            ? 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                            : 
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Header;