import React, {useState, useEffect} from 'react'
import Search from './Search'
import CardList from './CardList'
import JoblyApi from './JoblyApi'

const Jobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyApi.getJobs()
            setJobs(jobs)
        }
        getJobs()
    }, [])

    async function handleSearch(search){
        let jobs = await JoblyApi.getJobs(search);
        setJobs(jobs)
    }

    const apply = async (i) => {
        let jobId = jobs[i].id;
        let msg = await JoblyApi.applyToJob(jobId)
        setJobs(j=>j.map(job => job.id===jobId? {...job, state: msg}: job))
    }

    return(
        <div className="Jobs col-md-8 offset-md-2">
            <Search endpoints="jobs" searchFor={handleSearch} />
            <CardList cards={jobs} apply={apply} />
        </div>
    )
}

export default Jobs