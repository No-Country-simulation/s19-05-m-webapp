import { useState, useEffect, useMemo } from 'react';

const useFetch = (api, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [hasError, setHasError] = useState(null);

    const getData = useMemo(() => {
        return async () => {
            setLoading(true);  
            setHasError(null);  
            setData(null);

            try {
                const result = await api(params);
                setData(result);  
            } catch (error) {
                const errorMessage = error.message || "Ha ocurrido un error inesperado.";
                setHasError(errorMessage);
            } finally {
                setLoading(false);  
            }
        };
    }, [api, params]);

    useEffect(() => {
        if (!api) return;
        getData();
    }, [api, getData]);

    return { data, loading, hasError, setHasError, refetch: getData };
};

export default useFetch;
