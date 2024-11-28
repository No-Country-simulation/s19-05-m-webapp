import { useState, useCallback } from "react";

const usePagination = (initialPage = 1) => {
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);

    const loadMore = useCallback(() => {
        if (loading) return;
        
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);

    }, [loading]);

    const resetPagination = () => {
        setPage(initialPage);
        setLoading(false);
    };

    return { page, loading, loadMore, resetPagination };
};

export default usePagination;
