import React from "react"
import '../styles/components/SocialLogin.css';

const SocialLogin = () => {

    const handleNaverLogin = () => {
        window.location.href = "https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
    }
    
    const handleKakaoLogin = () => {
        window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
    }
    
    return (
        <div className="social-login">
            <button type="button" className="social-button" onClick={handleNaverLogin}>
                <img src="/images/socialLoginButtons/btnG_완성형.png" alt="네이버 로그인" className="social-img" />
            </button>
            <button type="button" className="social-button" onClick={handleKakaoLogin}>
                <img src="/images/socialLoginButtons/kakao_login_large_narrow.png" alt="카카오 로그인" className="social-img" />
            </button>
        </div>
    )

    // 소셜로그인 후에 /pages/TeacherPage로 넘어갈 수 있도록 해야 함
}

export default SocialLogin;