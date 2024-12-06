import { useState, useEffect, useMemo } from "react";

const useFilteredTable = (data, admin, filterType) => {
    const [visibleData, setVisibleData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const filteredData = useMemo(() => {
        return data?.map((p) => {
            if (admin && filterType === "orders") {
                return {
                    id: p.id,
                    name: p.name,
                    date: p.date,
                    status: p.status,
                    full: p
                };
            } else if(admin) {
                return {
                    id: p.id_product,
                    title: p.title,
                    price: p.price,
                    stock: p.stock,
                    full: p
                }
            } else {
                // usuario normal
            }
        });
    }, [data, admin, filterType]);
    

    useEffect(() => {
        if (filteredData?.length) {
            setVisibleData(filteredData.slice(0, 10)); 
            setHasMore(filteredData.length > 10); 
        }
    }, [filteredData]);

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
