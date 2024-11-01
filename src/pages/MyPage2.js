import React, { useEffect, useState } from "react";
import '../styles/pages/MyPage.css'; // 스타일 import
import { useNavigate } from "react-router-dom";
import RollItem from "../components/RollItem";

const MyPage2 = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [rolls, setRolls] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchTokenAndUserInfo = async () => {
            try {
                // 토큰 가져오기
                const authHeader = window.headers.get("Authorization"); // 서버 응답에서 직접 헤더를 읽어온다고 가정
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const token = authHeader.split(" ")[1];
                    localStorage.setItem("Authorization", `Bearer ${token}`);
                    setToken(token);
                    console.log("토큰 저장 완료:", token);
                } else {
                    console.error("Authorization 헤더를 찾을 수 없습니다.");
                    alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                    navigate('/');
                    return;
                }

                // 사용자 정보 가져오기
                const userInfoResponse = await fetch(`http://localhost:8080/user/info`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!userInfoResponse.ok) {
                    console.error("사용자 정보를 불러오는 데 실패하였습니다:", userInfoResponse.status);
                    alert("로그인에 실패하였습니다.");
                    navigate("/");
                    return;
                }

                const data = await userInfoResponse.json();
                setUserName(data.userName); // 예시: 서버 응답에서 유저 이름을 설정
                setRolls(data.rolls); // 서버 응답에서 롤 데이터 설정
            } catch (error) {
                console.error("사용자 정보 가져오기 실패:", error);
                alert("로그인에 실패하였습니다.");
                navigate("/");
            }
        };

        fetchTokenAndUserInfo();
    }, [navigate]);

    const handleCreateRoll = async () => {
        const token = localStorage.getItem("Authorization");
        const rollName = "새 학급";

        try {
            const response = await fetch(`http://localhost:8080/roll/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ rollName }) // 요청 본문에 rollName 추가
            });

            if (!response.ok) {
                throw new Error(`롤 생성 실패: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("롤 생성 성공:", data);

        } catch (error) {
            console.error("롤 생성 요청 중 오류:", error);
        }
    };

    const teacherLogout = () => {
        localStorage.removeItem("Authorization");
        navigate("/login");
    };

    return (
        <div className="my-page-container">
            <div className="greeting-container">
                <p className="greeting">{userName} 선생님, 안녕하세요</p>
                <button className="logout-button" onClick={teacherLogout}>LOGOUT</button>
            </div>
            <div className="roll-list-container">
                {rolls.length > 0 ? (
                    rolls.map((roll) => (
                        <RollItem
                            key={roll.rollId}
                            roll={roll}
                        />
                    ))
                ) : (
                    <p>등록한 학급이 없습니다</p>
                )}
                <button onClick={handleCreateRoll} className="create-roll">롤 생성</button>
            </div>
        </div>
    );
};

export default MyPage2;