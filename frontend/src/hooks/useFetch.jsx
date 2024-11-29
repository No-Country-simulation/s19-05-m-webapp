import { useState, useEffect } from 'react';

const useFetch = (api, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [hasError, setHasError] = useState(null);

    useEffect(() => {
        if (!api) return;

        const getData = async () => {
            setLoading(true);  
            setHasError(null);  
            setData(null);

            try {
                const result = await api(params);
                setData(result);  
            } catch (error) {
                console.log(error)
                const errorMessage = error.message || "Ha ocurrido un error inesperado.";
                setHasError(errorMessage);
            } finally {
                setLoading(false);  
            }
        };

        getData();

    }, [api, params]);

    return { data, loading, hasError, setHasError }; 
};

export default useFetch;
