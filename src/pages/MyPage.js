import React, { useState } from "react";
import RollingPaperList from "../components/RollingPaperList";
import '../styles/pages/MyPage.css'; // 스타일 import

const MyPage = () => {
    const [teacherName, setTeacherName] = useState('OOO');

    const teacherlogout = () => {
        // 소셜로그인을 로그아웃하는 로직 필요
    };

    return (
        <div className="my-page-container"> {/* 전체 페이지 컨테이너 */}
            <div className="greeting-container"> {/* 인사말 컨테이너 */}
                <p className="greeting">{teacherName} 선생님, 안녕하세요</p>
                <button className="logout-button" onClick={teacherlogout}>LOGOUT</button>
            </div>
            <RollingPaperList />
        </div>
    );
};

export default MyPage;