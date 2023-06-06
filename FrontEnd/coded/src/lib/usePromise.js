import React,{useState, useEffect} from 'react'

export default function usePromise(promiseCreator, deps){
    const [loading, setLoding] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () =>{
            setLoding(true);
            try{
                const resolved = await promiseCreator();
                setResolved(resolved);
            }catch(e){
                setError(e);
            }
            setLoding(false);
        };
        process();
    }, deps);
    return [loading, resolved, error];
}
