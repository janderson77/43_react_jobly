import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import "./Company.css"
import UserContext from './UserContext'
import CardList from './CardList'
import JoblyApi from './JoblyApi'

function Company() {
    const {handle} = useParams()
    const {currentUser} = useContext(UserContext)
    const [company, setCompany] = useState(null)

    useEffect(() => {
        async function getCompanyJobs() {
            const {jobs} = currentUser;
            const c = await JoblyApi.getCompany(handle)

            const jobsAppliedTo = new Set(jobs.map(job=>job.id))

            c.jobs = c.jobs.map(job=> ({
                ...job,
                state: jobsAppliedTo.has(job.id) ? "applied": null
            }));

            setCompany(c)
        }
        getCompanyJobs();
    }, [handle, currentUser])

    async function apply(idx) {
        if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
            let jobId = company.jobs[idx].id;
            let message = await JoblyApi.applyToJob(jobId);
            setCompany(c => {
                let newCompany = {...c}
                newCompany.jobs = newCompany.jobs.map(job=>
                    job.id === jobId ? {...job, state: message} : job    
                );
                return newCompany
            })
        }
    }


    if(!company){
        return<div>Loading...</div>
    }

    return(
        
        <div className="col-md-8 offset-md-2">
            <h5>{company.name}</h5>
            <p>{company.description}</p>
            <CardList cards={company.jobs} apply={apply} />
        </div>
    )
}

export default Company