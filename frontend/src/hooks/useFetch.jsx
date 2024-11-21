import { useState, useEffect } from 'react';

const useFetch = (api) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await api();  
                setData(result);  
            } catch (error) {
                setHasError('Error...');  // pasar error de la llamada
            } finally {
                setLoading(false); 
            }
        };

        getData();
    }, [api]);

    return { data, loading, hasError }; 
};

export default useFetch;
