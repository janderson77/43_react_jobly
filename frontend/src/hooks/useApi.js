import React, {useEffect, useState} from 'react'
import JoblyApi from '../JoblyApi'

const useApi = (handle=undefined, endpoint="companies", paramsOrData=undefined, verb=undefined ) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            if(handle){
                try{
                    const res = await JoblyApi.getCompany(handle)
                    setResponse(res)
                }catch(e){setError(e)}
                setIsLoading(false)
            }else{
                try{
                    const res = await JoblyApi.request(endpoint)
                    setResponse(res)
                }catch(e){setError(e)}
                setIsLoading(false)
            }
            
        };
        getData()
    },[endpoint, handle])

    return {response, error, isLoading}
}

export default useApi