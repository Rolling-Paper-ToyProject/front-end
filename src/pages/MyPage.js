import React, { useEffect, useState } from "react";
import Roll from "../components/Roll";
import '../styles/pages/MyPage.css'; // 스타일 import
import { useNavigate, useParams } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();

    const { userId } = useParams(); // URL에서 userId를 추출하여 해당 선생님의 페이지로 접근
    const [teacherName, setTeacherName] = useState('OOO');
    const [rolls, setRolls] = useState([]);

    /** 
     * 실제로는 userId에 할당된 rolls를 불러와야한다.
    */
    
    // 가상의 API 호출 (실제 구현 시 백엔드에서 user_id를 기반으로 롤 데이터를 가져옴)
    useEffect(()=> {
        // 더미 데이터 (실제 API 응답 사용할 것)
        const fetchedRolls = [
            { rollId: 1, rollName: 'OO초등학교 4-1', classCode: 1234, url: 'https://www.sparklenote.com/roll/1' },
            { rollId: 2, rollName: 'OO초등학교 4-2', classCode: 5678, url: 'https://www.sparklenote.com/roll/2' }
        ]
        setRolls(fetchedRolls);
    }, [userId]);

    /**
     * userId는 URL에서 가져온 값으로, 현재 로그인한 유저나 특정 유저를 식별하는 고유 ID
     * ID를 기반으로 해당 유저의 데이터를 가져오거나 필터링할 수 있음
     * useEffect의 의존성 배열에 userId를 넣으면, userId가 변경될 때마다 이 useEffect가 다시 실행
     * 다른 유저로 변경되거나 userId가 새롭게 주어지면 해당 유저의 데이터를 다시 가져오는 역할
     * 이를 통해 각 유저의 고유한 롤링페이퍼 목록을 렌더링할 수 있게 됨
     */

    const teacherlogout = () => {
        // 소셜로그인을 로그아웃하는 로직 필요
        
        // 로직이 정상적으로 실행된 경우 로그인 페이지로 돌아감
        navigate('/login')
    };

    const enterRoll = (rollId) => {
        // 해당 rollId에 할당된 paper들을 불러오는 로직이 필요함


        navigate('roll/${rollId}')
        console.log(`롤링페이퍼 ${rollId}로 이동`);
    }

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            alert('복사 실패: ' + err);
        });
    }

    const handleUpdate = (rollId) => {
        // Roll 제목을 input으로 바꾼다
        // roll 수정하는 API 호출
        // 백엔드에서 sse를 이용하는데 롤 제목이 수정된 것을 반영하기 위해서 새로고침 필요한가?
    }

    const handleDelete = (rollId) => {
        // alert('정말 롤을 삭제하시겠습니까? 삭제된 롤은 복구되지 않습니다.')
        // roll 삭제하는 API 호출
        // 백엔드에서 sse를 이용하는데 롤 제목이 삭제된 것을 반영하기 위해서 새로고침 필요한가?
    }

    const handleCreateRoll = () => {
        // roll 생성하는 API 호출 이후로 추가 코딩 이루어져야 할 듯
        // 백엔드에서 sse를 이용하는데 새 롤이 생긴 것을 반영하기 위해서 새로고침 필요한가?
    }

    return (
        <div className="my-page-container"> {/* 전체 페이지 컨테이너 */}
            <div className="greeting-container"> {/* 인사말 컨테이너 */}
                <p className="greeting">{teacherName} 선생님, 안녕하세요</p>
                <button className="logout-button" onClick={teacherlogout}>LOGOUT</button>
            </div>
            <div className="roll-list-container">
                {rolls.map((roll) => (
                    <Roll
                        key={roll.rollId}
                        roll={roll}
                        onEnter={enterRoll}
                        onCopy={copyUrl}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
                <button onClick={handleCreateRoll} className="create-roll">롤 생성</button>
            </div>
        </div>
    );
};

export default MyPage;