import { useState } from "react";

const useLogin = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    return { isLoginOpen, openLogin, closeLogin };
};

export default useLogin;
