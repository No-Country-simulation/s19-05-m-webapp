import { useState, useEffect } from 'react';

const useFetch = (api, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [hasError, setHasError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);  
            setHasError(null);  
            setData(null);

            try {
                const result = await api(params);
                setData(result);  
            } catch (error) {
                setHasError(error);
            } finally {
                setLoading(false);  
            }
        };

        getData();
    }, [api, params]);

    return { data, loading, hasError }; 
};

export default useFetch;
