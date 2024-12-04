import { useState, useEffect } from "react";

const useFilteredTable = (data, admin) => {
    const [visibleData, setVisibleData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const filteredData = data?.map((p) => {
        if (admin) {
            return {
                id: p.id_product,
                title: p.title,
                price: p.price,
                stock: p.stock,
                fullProduct: p
            };
        }
    });

    useEffect(() => {
        if (filteredData?.length && visibleData.length === 0) {
            setVisibleData(filteredData.slice(0, 10));
        }
    }, [filteredData, visibleData.length]);

    const handleLoadMore = () => {
        const nextProducts = filteredData.slice(visibleData.length, visibleData.length + 5);
        setVisibleData(prev => [...prev, ...nextProducts]);

        if (visibleData.length + nextProducts.length >= filteredData.length) {
            setHasMore(false);
        }
    };

    return { visibleData, hasMore, handleLoadMore };
};

export default useFilteredTable;
