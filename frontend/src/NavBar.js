import React, {useContext} from 'react'
import './NavBar.css'
import {NavLink, Link} from 'react-router-dom'
import {Navbar} from 'reactstrap'
import UserContext from './UserContext'



const NavBar = ({logout}) => { 
    const {currentUser} = useContext(UserContext)

    const loggedIn = () => {
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/companies">
                    Companies
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/jobs" >
                    Jobs
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to={`/users/${currentUser.username}`} >
                    Profile
                    </NavLink>
                </li>
                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/" onClick={logout} >
                    Log Out
                    </NavLink>
                </li>
            </ul>
        )
    }

    const loggedOut = () => {
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4">
                    <Link className="nav-link" to="/login" >
                    Login
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/signup" >
                    Sign Up
                    </Link>
                </li>
            </ul>
        )
        
    }

    return(
        <Navbar expand="md">
            <Link to="/" className="navbar-brand">
            Jobly
            </Link>
            
            {currentUser ? loggedIn() : loggedOut()}
        </Navbar>
    )
}

export default NavBar