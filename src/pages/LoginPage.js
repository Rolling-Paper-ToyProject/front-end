import { useState } from "react"
import SocialLogin from '../components/SocialLogin'
import '../styles/pages/LoginPage.css';
import '../styles/common/Logo.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate(); // 페이지 전환을 위한 훅

    // 소셜 로그인 성공 시 호출되는 함수
    const handleSocialLoginSuccess = (userId) => {
        // 로그인 성공 후 고유의 userId를 URL에 포함하여 MyPage로 이동
        navigate('/mypage/${userId}')
    };

    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\rollingPaperLogo.webp" className="logo" alt="Logo" />
            </div>
            {/* 소셜 로그인 컴포넌트. 로그인 성공 시 handleSocialLoginSuccess 실행 */}
            <SocialLogin onLoginSuccess={handleSocialLoginSuccess}/>
        </div>
    );
};

export default LoginPage;