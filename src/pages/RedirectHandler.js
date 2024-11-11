import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {

        /** 
         * window.location.hash는 URL의 해시("#" 뒷부분)
         * ex) URL : http://example.com/#token=abc&refreshToken=xyz
         * window.location.hash = "#token=abc&refreshToken=xyz"
        */
         const hash = window.location.hash.substring(1); // "#" 기호를 제외하고 "token=abc&refreshToken=xyz" 부분만 추출

        /** 
         * URLSearchParams 객체 생성, 해시 문자열 파싱
         * "token=abc&refreshToken=xyz" => key-value 쌍으로 인식할 수 있게 만듦
        */
         const params = new URLSearchParams(hash);

        /** 
         * params 객체에서 'token'이라는 키로 값을 검색하여 변수 token에 저장
         * 위의 예시에서는 token 변수에 "abc"가 저장됨
        */
        const token = params.get('token');

        /**  
         * params 객체에서 'refreshToken'이라는 키로 값을 검색하여 변수 refreshToken에 저장
         * 위의 예시에서는 refreshToken 변수에 "xyz"가 저장됨
        */
        const refreshToken = params.get('refreshToken');
        
        if (token && refreshToken) {
            
            // 토큰 저장
            localStorage.setItem("Authorization", `Bearer ${token}`);
            localStorage.setItem("RefreshToken", refreshToken);
            navigate("/mypage");

        } else {
            console.error("No tokens received");
            // navigate("/");
        }
        
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div>로그인 처리 중입니다...</div>
        </div>
    );
};

export default RedirectHandler;