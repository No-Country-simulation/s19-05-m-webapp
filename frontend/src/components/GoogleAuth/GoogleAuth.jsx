import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../../store/slices/auth.slices";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        dispatch(setUser(userObject));
    }

    function handleSignOut(event) {
        dispatch(logout());
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "152919958051-h2t2jisgn1hl97egdrst3uphhecsqp7s.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        })

        google.accounts.id.renderButton(
            document.getElementById("logInButton"),
            { theme: "outline", size: "large" }
        )
        if (user) {
            document.getElementById("logInButton").style.display = "none";
        } else {
            document.getElementById("logInButton").style.display = "block";
        }
    }, [user]);

    return (
        <div>
            <div id="logInButton"></div>
            {user && (
                <>
                    <button onClick={handleSignOut}>Sign Out</button>
                    <div>
                        <img src={user.picture} alt="User avatar" style={{width:100}}/>
                        <h3>{user.name}</h3>
                    </div>
                </>
            )}
        </div>
    )
}

export default GoogleAuth