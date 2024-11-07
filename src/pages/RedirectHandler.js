import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const navigate = useNavigate();
    const url = "8ffe30a7";

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');

        if (token && refreshToken) {
            try {
                // 토큰 저장
                localStorage.setItem("Authorization", `Bearer ${token}`);
                localStorage.setItem("RefreshToken", refreshToken);

                console.log("Access Token:", token);
                console.log("Refresh Token:", refreshToken);
                
                // 선생님 정보 요청
                // const fetchTeacherInfo = async () => {
                //     try {
                //         const teacherInfoResponse = await fetch('http://localhost:8080/user/info', {
                //             method: "GET",
                //             headers: {
                //                 "Accept": "application/json",
                //                 "Authorization": `Bearer ${token}`
                //             }
                //         });

                //         if (!teacherInfoResponse.ok) {
                //             throw new Error('User info fetch failed');
                //         }

                //         const teacherData = await teacherInfoResponse.json();
                //         console.log("User Data:", teacherData);

                //         // 성공적으로 처리되면 마이페이지로 이동
                //         navigate("/mypage");
                //     } catch (error) {
                //         console.error("Error fetching user info:", error);
                //         navigate("/");  // 에러 시 로그인 페이지로
                //     }
                // };

                // 학생 정보 요청
                // const fetchStudentInfo = async () => {
                //     try {
                //         const studentInfoResponse = await axios.get(`http://localhost:8080/paper/${rollId}`,)
                //     }
                // }

                // fetchTeacherInfo();
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