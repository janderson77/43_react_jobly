import React, {useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import UserContext from './UserContext'
import JoblyApi from './JoblyApi'

const Profile = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {username} = useParams()

    const [userForm, setUserForm] = useState({
        first_name: currentUser.first_name || "", 
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        photo_url: currentUser.photo_url || "",
        username: currentUser.username || "",
        password: "",
        errors: []
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            let data = {
                first_name: userForm.first_name || undefined,
                last_name: userForm.last_name || undefined,
                email: userForm.email || undefined,
                photo_url: userForm.photo_url || undefined,
                password: userForm.password
            }
            
            let username = userForm.username
            let res = await JoblyApi.saveProfile(username, data)
            setUserForm(data => ({
                ...data,
                errors: [],
                password: ''
            }))
            setCurrentUser(res)
        }catch(errors){
            setUserForm(data => ({...data, errors}))
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserForm(userForm => ({
            ...userForm,
            [name]: value,
            errors: []
        }))
    }

    if(currentUser.username === username){
        return(  
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <h3>Profile</h3>
                <div className="card">
                    <div className='card-body'>
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <p className="form-control-plaintext">{userForm.username}</p>
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input 
                                    name='first_name'
                                    className="form-control"
                                    value={userForm.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input 
                                    name="last_name"
                                    className="form-control"
                                    value={userForm.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input 
                                    name="email"
                                    className="form-control"
                                    value={userForm.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Photo URL</label>
                                <input 
                                    name="photo_url"
                                    className="form-control"
                                    value={userForm.photo_url}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm your password to make changes:</label>
                                <input 
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={userForm.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                className="btn btn-primary btn-block mt-4"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <h1>This is {username}'s profile. Say hi!</h1>
        )
    }
}

export default Profile