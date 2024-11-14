import { useLocation, useNavigate } from "react-router-dom";
import StudentSignin from "../components/StudentSignin";
import '../styles/common/Logo.css';
import { useEffect } from "react";

const StudentSigninPage = () => {
    const location = useLocation();
    const url = location.pathname.split('/').pop();

    // const pathnameParams = new URLSearchParams(location.pathname);
    // const url = pathnameParams.get("")

    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\image_logo.png" className="logo" alt="Logo" />
            </div>
            <StudentSignin 
                url={url} 
            />
        </div>   
    )
}

export default StudentSigninPage