import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const NaverRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL (window.location.href);
        const authCode = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        
        if (authCode) {
            fetch(`http://localhost:8080/login/oauth2/code/naver?code=${authCode}&state=${state}`)
                .then(response => response.json())
                .then(data => {
                    const userId = data.userId; // 백엔드로부터 받은 사용자 ID를 변수에 저장
                    navigate(`/mypage/${userId}`); // 사용자 ID를 사용하여 MyPage로 리다이렉트
                })
                .catch(error => {
                    console.error("로그인 처리 중 오류 발생", error);
                    alert("로그인 실패");
                });
        }
    }, [navigate]);

    return <div>네이버 로그인 처리 중입니다...</div>;
} 