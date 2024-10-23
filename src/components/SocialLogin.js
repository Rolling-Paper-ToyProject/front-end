import React from "react"
import '../styles/components/SocialLogin.css';

const SocialLogin = ({ onLoginSuccess }) => {
 
    const handleNaverLogin = () => {
        
        /** Spring Security로 간소화 하기 전 코드
         * const CLIENT_ID = '8JVwALZwrnomasZCN1Gz';
         * const STATE = false;
         * const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/naver';
        
         * 네이버 로그인 버튼 클릭 시 호출
         * const handleNaverLogin = () => {
         *     window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
         * }
        */ 

        // Spring Security로 간소화 적용 후 코드
        const handleNaverLogin = () => {
            // Spring Security가 제공하는 네이버 OAuth2 인증 엔드포인트로 리다이렉트
            window.location.href = '/oauth2/authorization/naver';
        };

        // 네이버 로그인 성공 후 콜백으로 userId를 받는 로직 필요
        // const userId = 'naver-user-456'; // 실제 로그인 후 받아온 유저 ID로 대체
        // onLoginSuccess(userId);
    }
    
    const handleKakaoLogin = () => {
        
        /** Spring Security로 간소화 하기 전 코드
         * const REST_API_KEY = 'ba3d44d9bf772202d5d5b7cdf5cf3fae'; // 실제 REST API 키를 여기에 설정
         * const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // 실제 리다이렉트 URI를 여기에 설정
         * const HINT = ''; // 필요 시 로그인 힌트 설정 (optional)

         * 카카오 OAuth 인증 페이지로 리다이렉트 (실제 구현 시 이 부분에서 리다이렉트된 후 인증 코드 처리 필요)
         * window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
        */

        // Spring Security로 간소화 적용 후 코드
        const handleKakaoLogin = () => {
            // Spring Security가 제공하는 카카오 OAuth2 인증 엔드포인트로 리다이렉트
            window.location.href = '/oauth2/authorization/kakao';
        };

        // 카카오 로그인 성공 후 콜백으로 userId를 받는 로직 필요
        // const userId = 'kakao-user-123'; 
        // 실제 로그인 후 받아온 유저 ID로 대체
        // onLoginSuccess(userId); // 성공 시 부모 컴포넌트로 유저 ID 전달
    }
    
    return (
        <div className="social-login">
            <button type="button" className="social-button" onClick={handleNaverLogin}>
                <img src="/images/socialLoginButtons/naverSocialLogin.png" alt="네이버 로그인" className="social-img" />
            </button>
            <button type="button" className="social-button" onClick={handleKakaoLogin}>
                <img src="/images/socialLoginButtons/kakaoSocialLogin.png" alt="카카오 로그인" className="social-img" />
            </button>
        </div>
    )
}

export default SocialLogin;