import { useState } from 'react';

const useCrud = (api, body) => {
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [hasError, setHasError] = useState(null);

    const req = async () => {
        if (!api || !body) return;
        setLoading(true);
        setHasError(null);
        setRes(null);
       
        try {
            const result = await api(body); 
            setRes(result); 
        } catch (error) {
            const errorMessage = error.message || "Ha ocurrido un error inesperado.";
            setHasError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { req, res, loading, hasError };
};

export default useCrud;
