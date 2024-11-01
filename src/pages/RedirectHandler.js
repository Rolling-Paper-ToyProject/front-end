import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleLoginSuccess = (token) => {
    localStorage.setItem("Authorization", `Bearer ${token}`);
};

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // localStorage에서 토큰을 가져옴
                const token = localStorage.getItem("Authorization");
                
                console.log(token);
                
                const response = await fetch(`http://localhost:8080/user/info`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `${token}` // Authorization 헤더에 토큰 추가
                    }
                });

                console.log(response);

                if (!response.ok) {
                    console.error("사용자 정보를 불러오는 데 실패하였습니다:", response.status);
                    return;
                }

                const data = await response.json();
                console.log("User Data:", data);

                // navigate("/mypage"); // 필요한 경우 마이페이지로 이동
            } catch (error) {
                console.error("사용자 정보 가져오기 실패:", error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
};

export default RedirectHandler;