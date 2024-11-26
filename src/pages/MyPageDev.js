import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/MyPage.css';
import RollItem from "../components/RollItem";
import { CustomButton2, LetterClick } from '../components/MuiButton';
import { UserLogout } from '../components/MuiIcon';
import CreateRollModal from "../components/CreateRollModal";
import AddIcon from '@mui/icons-material/Add';
import { ArrowDown } from 'lucide-react';

const MyPageDev = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("김교사");
    const [isCreateRollModalOpen, setIsCreateRollModalOpen] = useState(false);
    const [showGuide, setShowGuide] = useState(true);
    const [role] = useState("TEACHER");

    // 개발용 더미 데이터
    const [rolls, setRolls] = useState([
        {
            rollId: 1,
            rollName: "4학년 1반",
            rollCode: "7334",
            teacherName: "김교사",
            studentCount: 25
        },
        {
            rollId: 2,
            rollName: "4학년 2반",
            rollCode: "7335",
            teacherName: "김교사",
            studentCount: 27
        }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGuide(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const teacherlogout = () => {
        navigate('/');
    };

    const closeModal = () => {
        setIsCreateRollModalOpen(false);
    }

    return (
        <div className="my-page-container">
            <div className="greeting-container">
                <p className="greeting"><span>{userName}</span> 선생님, 안녕하세요! 🙇‍♂️
                </p>
                <LetterClick className="logout-button" onClick={teacherlogout}>
                    <UserLogout />
                    <p>LOGOUT</p>
                </LetterClick>
            </div>
            <div className="roll-list-container">
                <p className="highlighted-text">📌 학급 목록</p>

                {Array.isArray(rolls) && rolls.length > 0 ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        {showGuide && (
                            <div className="click-guide">
                                <div className="click-guide-message">
                                    클릭하여 입장해주세요!
                                </div>
                                <ArrowDown size={24} color="#4F46E5" />
                            </div>
                        )}
                        {rolls.map((roll) => (
                            <RollItem
                                key={roll.rollId}
                                roll={roll}
                                role={role}
                                className={showGuide ? 'highlight' : ''}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-class">등록된 학급이 없습니다.</p>
                )}

                <CustomButton2
                    onClick={() => setIsCreateRollModalOpen(true)}
                    className="create-roll"
                >
                    <AddIcon style={{marginRight:"5px"}}></AddIcon> 학급 생성
                </CustomButton2>
            </div>

            {isCreateRollModalOpen && <CreateRollModal closeModal={closeModal} />}
        </div>
    );
};

export default MyPageDev;