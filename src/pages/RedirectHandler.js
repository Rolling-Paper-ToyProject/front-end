import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
=======
        const params = new URLSearchParams(window.location.search);
>>>>>>> 36ab2119c6764a57a2b8776d416bfc93db9508a2
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');

        if (token && refreshToken) {
            try {
                // 토큰 저장
                localStorage.setItem("Authorization", `Bearer ${token}`);
                localStorage.setItem("RefreshToken", refreshToken);

                console.log("Access Token:", token);
                console.log("Refresh Token:", refreshToken);

                // 유저 정보 요청
                const fetchUserInfo = async () => {
                    try {
                        const userInfoResponse = await fetch('http://localhost:8080/user/info', {
                            method: "GET",
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!userInfoResponse.ok) {
                            throw new Error('User info fetch failed');
                        }

                        const userData = await userInfoResponse.json();
                        console.log("User Data:", userData);

                        // 성공적으로 처리되면 마이페이지로 이동
                        navigate("/mypage");
                    } catch (error) {
                        console.error("Error fetching user info:", error);
                        navigate("/");  // 에러 시 로그인 페이지로
                    }
                };

                fetchUserInfo();
            } catch (error) {
                console.error("Error processing tokens:", error);
                navigate("/");
            }
        } else {
            console.error("No tokens received");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div>로그인 처리 중입니다...</div>
        </div>
    );
};

export default RedirectHandler;