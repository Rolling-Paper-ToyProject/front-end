import { useState } from "react"
import SocialLogin from '../components/SocialLogin'
import '../styles/pages/LoginPage.css';
import '../styles/common/Logo.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\image_logo.png" className="logo" alt="Logo" />
            </div>

            <h2>Login</h2>
            {/* 소셜 로그인 컴포넌트. 로그인 성공 시 handleSocialLoginSuccess 실행 */}
            <SocialLogin />
        </div>
    );
};

export default LoginPage;