import React, {useState} from 'react'
import useApi from './hooks/useApi'

const CompaniesForm = () => {
    const INITIAL_STATE = {
        search: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        useApi({...formData})
        setFormData(INITIAL_STATE)
    }

    return(
        <form className="form-inline" onSubmit={handleSubmit} >
            <input 
                className="form-control form-control-lg flex-grow-1" 
                name="search"
                id="search"
                key="search"
                placeholder="Enter search term"
                value={formData.search}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-lg btn-primary" >Submit</button>
        </form>
    )
}

export default CompaniesForm