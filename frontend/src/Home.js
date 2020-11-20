import React, {useContext} from 'react'
import "./Home.css"
import UserContext from './UserContext'

const Home = () => {
    let greeting;
    const {currentUser} = useContext(UserContext)
    if(currentUser) {
        greeting = (
            <h2>Welcome Back!</h2>
        )
    }else{
        greeting = (
            <a className="btn btn-primary font-weight-bold" href="/login">Log In</a>
        )
    }
    return(
        <div className="Home">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                {greeting}
            </div>
        </div>
    )
}

export default Home