import React, {useState} from 'react'
import JoblyApi from './JoblyApi'
import {Link, useHistory} from 'react-router-dom'
import "./SignUp.css"

const SignUp = ({setToken}) => {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
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
        let data = {
            username: formData.username,
            password: formData.password,
            first_name: formData.first_name || undefined,
            last_name: formData.last_name || undefined,
            email: formData.email || undefined
        }
        let token;

        try{
            token = await JoblyApi.register(data)
        }catch(errors){
            return setFormData(formData => ({...formData, errors}))
        }

        setToken(token)
        history.push('/jobs')
        

    }

    return(
    <div className="SignUp">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card">
                <div className="card-body">
                    <div className="card-title"><h5>Sign Up</h5></div>
                    <hr/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label
                                htmlFor="username"
                            >Username: </label>
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
                            <label
                                htmlFor="password"
                            >Password: </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                key="password"
                                value={formData.password}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="first_name"
                            >First Name: </label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                key="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="last_name"
                            >Last Name: </label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                key="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="email"
                            >Email: </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                key="email"
                                value={formData.email}
                                onChange={handleChange}
                            ></input>
                        </div>
                        <button type="submit" className="btn btn-primary font-wight-bold float-right">Sign Up</button>
                    </form>
                </div>
            </div>
            
            <div className="d-flex justify-content-center">
                <p>Already have an account? Log In <Link to="/login">here!</Link></p>
            </div>
        </div>

    </div>
    )
}

export default SignUp