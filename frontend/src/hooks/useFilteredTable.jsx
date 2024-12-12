import { useState, useEffect, useMemo } from "react";
import formatDate from "../utils/formatDate";
import translate from "../utils/translate";

const useFilteredTable = (data, admin, filterType) => {
    const [visibleData, setVisibleData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const filteredData = useMemo(() => {
        return data?.map((obj) => {
            if (admin && filterType === "orders") {
                return {
                    id: obj.id_checkout,
                    name: obj.shopping_user,
                    date: formatDate(obj.date_checkout),
                    status: translate.paymentStatus(obj.status),
                    full: obj
                };
            } else if (admin && filterType === "users") {
                return {
                    id: obj.id_users,
                    name: obj.name,
                    email: obj.email,
                    status: obj.active ? 'ACTIVO' : 'INACTIVO',
                    role: translate.userRole(obj.role),
                    full: obj
                };
            } else if (admin) {
                return {
                    id: obj.id_product,
                    title: obj.title,
                    price: `$${obj.price}`,
                    stock: obj.stock,
                    full: obj
                };
            } else {
                // usuario normal
            }
        }).filter(Boolean); 
    }, [data, admin, filterType]);

    useEffect(() => {
        if (filteredData?.length) {
            setVisibleData(filteredData.slice(0, 10)); 
            setHasMore(filteredData.length > 10);
        }
    }, [filteredData]);

    const handleLoadMore = () => {
        setVisibleData((prev) => {
            const nextProducts = filteredData?.slice(prev.length, prev.length + 5);
            const updatedData = [...prev, ...nextProducts];
            
            setHasMore(updatedData.length < filteredData.length);

            return updatedData;
        });
    };

    return { visibleData, hasMore, handleLoadMore };
};

export default useFilteredTable;
