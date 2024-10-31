import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleLoginSuccess = (token) => {
    localStorage.setItem("Authorization", `Bearer ${token}`);
};

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTokenAndUserInfo = async () => {
            try {
                // 토큰을 가져오기 위해 소셜 로그인 콜백 API 호출
                // const tokenResponse = await fetch(`http://localhost:8080/login/oauth2/code/naver`, {
                //     method: "GET",
                //     credentials: "include" // 필요한 경우 쿠키를 포함
                // })
                
                // 응답에서 토큰 추출
                const authHeader = window.headers.get("Authorization");
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const token = authHeader.split(" ")[1]; // 'Bearer ' 이후의 순수 토큰 값 추출
                    console.log("토큰 저장 완료:", token);
                    handleLoginSuccess(token); // 추출한 토큰을 저장
                } else {
                    console.error("Authorization 헤더를 찾을 수 없습니다");
                    // navigate("/");
                }

                // localStorage에서 토큰을 가져옴
                const token = localStorage.getItem("Authorization");
                console.log("token in local storage:", token);
                
                // 이후 사용자 정보 요청
                const userInfoResponse = await fetch(`http://localhost:8080/user/info`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}` // Authorization 헤더에 토큰 추가
                    }
                });

                console.log(userInfoResponse);

                if (!userInfoResponse.ok) {
                    console.error("사용자 정보를 불러오는 데 실패하였습니다:", userInfoResponse.status);
                    // navigate("/");
                }

                const data = await userInfoResponse.json();
                console.log("User Data:", data);
                // navigate("/mypage"); // 필요한 경우 마이페이지로 이동

            } catch (error) {
                console.error("사용자 정보 가져오기 실패:", error);
                navigate("/")
            }
        };

        fetchTokenAndUserInfo();
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
};

export default RedirectHandler;