import React, {useState} from 'react'
import JoblyApi from './JoblyApi'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import './Login.css'

const Login = ({setToken}) => {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        errors: []
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data= {
            username: formData.username,
            password: formData.password
        }
        let token;

        try{
            token = await JoblyApi.login(data)
        }catch(errors){
            return setFormData(formData => ({...formData, errors}))
        }

        setToken(token)
        history.push('/jobs')
        

    }

    return(
    <div className="Login">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
                
                <div className="card-body">
                    <div className="card-title"><h5>Login</h5></div>
                    <hr></hr>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                key="username"
                                value={formData.username}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                key="password"
                                value={formData.password}
                                onChange={handleChange}
                            ></input>
                        </div>
                        
                        
                        <button className="btn btn-primary float-right">Log In</button>
                    </form>
                </div>
            </div>
            
            
            <div className="d-flex justify-content-center">
                <p>No account? Sign Up <Link to="/signup">here!</Link></p>
            </div>
        </div>

    </div>
    
    )
}

export default Login