import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/MyPage.css';
import RollItem from "../components/RollItem";
import { CustomButton2 , LetterClick } from '../components/MuiButton';
import {UserLogout} from '../components/MuiIcon';
import axios from "axios";
import CreateRollModal from "../components/CreateRollModal";
import AddIcon from '@mui/icons-material/Add';
import { API } from "../config";
import { ArrowDown } from "lucide-react";


const MyPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [rolls, setRolls] = useState([]);
    const [role, setRole] = useState();
    const [showGuide, setShowGuide] = useState(true);
    const [isCreateRollModalOpen, setIsCreateRollModalOpen] = useState(false);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchData = async () => {

            if (!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate('/');
                return;
            }

            try {
                // 사용자 정보 가져오기
                const userResponse = await axios.get(
                    API.TEACHER_PROFILE,
                    { headers: { "Authorization": token } }
                );

                if (!userResponse === 200) {
                    throw new Error('Failed to fetch user info');
                }

                const userData = userResponse.data;
                console.log("User Info Response:", userData);
                setUserName(userData.data.name);
                setRole(userData.data.role);

                // 롤 데이터 가져오기
                const rollResponse = await axios.get(
                    API.GET_ROLL,
                    { headers: { "Authorization": token } }
                );

                if (!rollResponse === 200) {
                    throw new Error('Failed to fetch roll data');
                }

                const rollData = rollResponse.data;
                console.log("Roll Data Response:", rollData);
                setRolls(rollData.data || []); // 빈 배열 fallback 추가

            } catch (error) {
                console.error('Error:', error);
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGuide(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const teacherlogout = () => {
        // localStorage.removeItem("Authorization");
        // localStorage.removeItem("RefreshToken");
        localStorage.clear();
        navigate('/');
    };

    const closeModal = () => {
        setIsCreateRollModalOpen(false);
    }

    return (
        <div className="my-page-container">
            <div className="greeting-container">
                <p className="greeting"><span>{userName}</span> 선생님, 안녕하세요! 🙇‍♂️</p>
                <LetterClick className="logout-button" onClick={teacherlogout}>
                    <UserLogout />
                    <p>LOGOUT</p>
                </LetterClick>
            </div>
            <div className="roll-list-container">
                <p className="highlighted-text">📌학급 목록</p>

                {Array.isArray(rolls) && rolls.length > 0 ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        {( showGuide && rolls.length === 1 ) && (
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

            {isCreateRollModalOpen && <CreateRollModal closeModal={closeModal} /> }

        </div>
    );
};

export default MyPage;