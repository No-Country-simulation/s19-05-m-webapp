import { useEffect, useCallback } from "react";

const InfiniteScroll = ({ onLoadMore, hasMore, loading }) => {
    const handleScroll = useCallback(() => {
        if (loading || !hasMore) return;
        
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            onLoadMore();
        }
        
    }, [loading, hasMore, onLoadMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return null;
};

export default InfiniteScroll;
