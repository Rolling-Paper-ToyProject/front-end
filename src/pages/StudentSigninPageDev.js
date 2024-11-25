import { useLocation } from "react-router-dom";
import StudentSignin from "../components/StudentSigninDev";
import '../styles/common/Logo.css';

const StudentSigninPage = () => {
    const location = useLocation();
    const url = location.pathname.split('/').pop();

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