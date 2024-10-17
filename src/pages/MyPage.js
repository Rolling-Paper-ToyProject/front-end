import React, { useEffect, useState } from "react";
import RollingPaperItem from "../components/RollingPaperItem";
import '../styles/pages/MyPage.css'; // 스타일 import
import { useParams } from "react-router-dom";

const MyPage = () => {
    const { userId } = useParams(); // URL에서 userId를 추출하여 해당 선생님의 페이지로 접근
    const [teacherName, setTeacherName] = useState('OOO');
    const [rolls, setRolls] = useState([]);
    const [copyMessage, setCopyMessage] = useState('');

    // 가상의 API 호출 (실제 구현 시 백엔드에서 user_id를 기반으로 롤 데이터를 가져옴)
    useEffect(()=> {
        // 더미 데이터 (실제 API 응답 사용할 것)
        const fetchedRolls = [
            { rollId: 1, rollName: 'OO초등학교 4-1', classCode: 1234, url: 'https://example.com/roll/1' },
            { rollId: 2, rollName: 'OO초등학교 4-2', classCode: 5678, url: 'https://example.com/roll/2' }
        ]
        setRolls(fetchedRolls);
    }, [userId]);

    const teacherlogout = () => {
        // 소셜로그인을 로그아웃하는 로직 필요
    };

    const enterRoll = (rollId) => {
        // 롤링페이퍼 상세 페이지로 이동하는 로직 필요
        console.log(`롤링페이퍼 ${rollId}로 이동`);
    }

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
            setCopyMessage('URL이 클립보드에 복사되었습니다.')
        }).catch(err => {
            alert('복사 실패: ' + err);
        });
    }

    const handleUpdate = (rollId) => {

    }

    const handleDelete = (rollId) => {
        
    }

    return (
        <div className="my-page-container"> {/* 전체 페이지 컨테이너 */}
            <div className="greeting-container"> {/* 인사말 컨테이너 */}
                <p className="greeting">{teacherName} 선생님, 안녕하세요</p>
                <button className="logout-button" onClick={teacherlogout}>LOGOUT</button>
            </div>

            <div className="rolling-paper-list-container">
                {rolls.map((roll) => (
                    <RollingPaperItem
                        key={roll.rollId}
                        roll={roll}
                        onEnter={enterRoll}
                        onCopy={copyUrl}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        copyMessage={copyMessage}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyPage;