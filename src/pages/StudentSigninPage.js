import { useLocation, useNavigate } from "react-router-dom";
import StudentSignin from "../components/StudentSignin";
import '../styles/common/Logo.css';
import { useEffect } from "react";

const StudentSigninPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("Authorization")
    const url = location.pathname.split('/').pop();

    // URL을 통해서 왔을 때 특정 학급에 접근할 수 있는 입장 페이지가 나올 수 있도록 해야한다.
    // useEffect(() => {
    //     const hash = window.location.hash.substring(1);
    //     const params = new URLSearchParams(hash);
    //     const token = params.get('token');
    //     const refreshToken = params.get('refreshToken');
    //     console.log(token);

    //     if (token && refreshToken) {
    //         try {
    //             // 토큰 저장
    //             localStorage.setItem("Authorization", `Bearer ${token}`);
    //             localStorage.setItem("RefreshToken", refreshToken);

    //             console.log("Access Token:", token);
    //             console.log("Refresh Token:", refreshToken);
    //         } catch (error) {
    //             console.error("Error processing tokens:", error);
    //             navigate(`/${url}`);
    //         }
    //     } else {
    //         console.error("No tokens received");
    //         navigate(`/${url}`);
    //     }
    // }, [navigate]);

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