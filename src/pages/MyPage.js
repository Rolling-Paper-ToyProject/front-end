import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/MyPage.css';
import RollItem from "../components/RollItem";
import { CustomButton2 } from '../components/MuiButton';
import axios from "axios";

const MyPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [rolls, setRolls] = useState([]);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchData = async () => {

            if (!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate('/')
                return;
            }

            try {
                // 사용자 정보 가져오기
                const userResponse = await fetch('http://localhost:8080/user/info', {
                    headers: {
                        "Authorization": token
                    }
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const userData = await userResponse.json();
                console.log("User Info Response:", userData);
                setUserName(userData.data.name);  // SnResponse 구조에 맞게 수정

                // 롤 데이터 가져오기
                const rollResponse = await fetch(`http://localhost:8080/roll/my/rolls`, {
                    headers: {
                        "Authorization": token
                    }
                });

                if (!rollResponse.ok) {
                    throw new Error('Failed to fetch roll data');
                }

                const rollData = await rollResponse.json();
                console.log("Roll Data Response:", rollData);
                setRolls(rollData.data || []); // 빈 배열 fallback 추가

            } catch (error) {
                console.error('Error:', error);
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    const teacherlogout = () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("RefreshToken");
        navigate('/');
    };

    const handleCreateRoll = async () => {
        try {
            await axios.post(`http://localhost:8080/roll/create`, { rollName: "새 학급"}, {
                headers: {
                    "Authorization": token
                }
            });
            alert("새 학급이 생성되었습니다.");
            window.location.reload();
        } catch (error) {
            console.log('롤 생성 실패', error)
        }

        /** 
            1. "rollName" : "새 학급" 이라는 요청값을 주면서 롤 생성 API를 불러온다
            2. 응답을 받으면 RollItem.js에서 띄워준다.
            3. 롤 조회를 하는 API를 다시 불러온다.
        */
    };



    return (
        <div className="my-page-container">
            <div className="greeting-container">
                <p className="greeting">{userName} 선생님, 안녕하세요</p>
                <CustomButton2 className="logout-button" onClick={teacherlogout}>
                    LOGOUT
                </CustomButton2>
            </div>
            <div className="roll-list-container">
                {Array.isArray(rolls) && rolls.length > 0 ? (
                    rolls.map((roll) => (
                        <RollItem
                            key={roll.rollId}
                            roll={roll}
                        />
                    ))
                ) : (
                    <p>등록된 학급이 없습니다</p>
                )}
                <CustomButton2
                    onClick={handleCreateRoll}
                    className="create-roll"
                >
                    ✛ 학급 생성
                </CustomButton2>
            </div>
        </div>
    );
};

export default MyPage;