import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 실행되는 코드 (카카오 인증 후 리다이렉트된 후 동작)

        const token = getCookie("Authorization") // 쿠키에서 token을 가져옴
        console.log("Token:", token);

        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch(`http://localhost:8080/user/my`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log("Response:", response);
            const data = await response.json();
            console.log("User Data:", data);

            if (data.userId && data.name) {
                localStorage.setItem("userName", data.name);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("Authorization", token);
                navigate(`/mypage`);
            }
        } catch (error) {
             console.error("사용자 정보 가져오기 실패:" + error);
        }
    }

    // 쿠키에서 token을 읽어오는 함수
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if(parts.length === 2) return parts.pop().split(';').shift();
    };

    return <div>로그인 처리 중입니다...</div>; // 인증 처리 중일 떄 화면에 "로그인 처리 중입니다..."라는 메시지를 출력
}

export default RedirectHandler;