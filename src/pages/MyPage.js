import React, { useEffect, useState } from "react";
import '../styles/pages/MyPage.css'; // 스타일 import
import { useNavigate, useParams } from "react-router-dom";
import RollItem from "../components/RollItem";

const MyPage = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [rolls, setRolls] = useState([]);

    useEffect(() => {
        // LocalStorage에서 userName을 가져와 설정
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        } else {
            alert("로그인 상태가 아닙니다. 다시 로그인해주세요.");
            navigate('/login');
        }
    }, []);

    /** 
     * 실제로는 userId에 할당된 rolls를 불러와야한다.
    */

    // 선생님의 이름과 롤 목록을 백엔드에서 가져오는 함수
    const fetchRollData = async () => {
        try {
            // 백엔드에서 선생님의 이름과 롤 테이터를 가져오는 API
            const response = await fetch(`http://localhost:8080/roll/my/rolls`);
            const data = await response.json();

            // 데이터 설정
            setUserName(data.name);
            setRolls(data.data);
        } catch (error) {
            console.error('데이터 가져오기 실패 : ', error)
        } 
    };

    // 가상의 API 호출 (실제 구현 시 백엔드에서 user_id를 기반으로 롤 데이터를 가져옴)
    /**
        useEffect(()=> {
            // 더미 데이터 (실제 API 응답 사용할 것)
            const fetchedRolls = [
                { rollId: 1, rollName: 'OO초등학교 4-1', classCode: 1234, url: 'https://www.sparklenote.com/roll/1' },
                { rollId: 2, rollName: 'OO초등학교 4-2', classCode: 5678, url: 'https://www.sparklenote.com/roll/2' }
            ]
            setRolls(fetchedRolls);
            
            fetchUserData();
        }, [userId]);
    */

    /**
        userId는 URL에서 가져온 값으로, 현재 로그인한 유저나 특정 유저를 식별하는 고유 ID
        ID를 기반으로 해당 유저의 데이터를 가져오거나 필터링할 수 있음
        useEffect의 의존성 배열에 userId를 넣으면, userId가 변경될 때마다 이 useEffect가 다시 실행
        다른 유저로 변경되거나 userId가 새롭게 주어지면 해당 유저의 데이터를 다시 가져오는 역할
        이를 통해 각 유저의 고유한 롤링페이퍼 목록을 렌더링할 수 있게 됨
    */

    const teacherlogout = () => {
        // 소셜로그인을 로그아웃하는 로직 필요
        
        // 로직이 정상적으로 실행된 경우 로그인 페이지로 돌아감
        navigate('/login')
    };

    const handleCreateRoll = () => {
        // roll 생성하는 API 호출
        // 백엔드에서 sse를 이용하는데 새 롤이 생긴 것을 반영하기 위해서 새로고침 필요한가?
    }

    return (
        <div className="my-page-container"> {/* 전체 페이지 컨테이너 */}
            <div className="greeting-container"> {/* 인사말 컨테이너 */}
                <p className="greeting">{userName} 선생님, 안녕하세요</p>
                <button className="logout-button" onClick={teacherlogout}>LOGOUT</button>
            </div>
            <div className="roll-list-container">
                {rolls. length > 0 ? (
                    rolls.map((roll) => (
                        <RollItem
                            key={roll.rollId}
                            roll={roll}
                        />
                    ))
                ) : (
                    <p>등록한 롤이 없습니다</p>
                )}
                <button onClick={handleCreateRoll} className="create-roll">롤 생성</button>
            </div>
        </div>
    );
};

export default MyPage;