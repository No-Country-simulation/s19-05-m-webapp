import { useState } from "react";

const useReset = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const reset = () => {
        setValues(initialState);
    };

    return { values, handleChange, reset, setValues };
};

export default useReset;
