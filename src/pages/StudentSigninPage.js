import { useLocation, useNavigate } from "react-router-dom";
import StudentSignin from "../components/StudentSignin";
import '../styles/common/Logo.css';
import { useEffect } from "react";

const StudentSigninPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("Authorization")
    const url = location.pathname.split('/').pop();

    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\image_logo.png" className="logo" alt="Logo" />
            </div>
            <StudentSignin 
                url={url} 
                token={token}
            />
        </div>
        
    )
}

export default StudentSigninPage