import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pages/MyPage.css';
import RollItem from "../components/RollItem";
import { CustomButton2 , CustomLogout} from '../components/MuiButton';
import {UserLogout} from '../components/MuiIcon';
import axios from "axios";
import CreateRollModal from "../components/CreateRollModal";
import { API } from "../config";

const MyPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [rolls, setRolls] = useState([]);
    const [role, setRole] = useState();
    const [isCreateRollModalOpen, setIsCreateRollModalOpen] = useState(false);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchData = async () => {
            console.log('Attempting to fetch data with token:', token);

            if (!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate('https://sparklenote.site/');
                return;
            }

            try {
                const userResponse = await fetch('https://sparklenote.site/user/profile', {
                    method: 'GET',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    credentials: 'include',
                    mode: 'cors'
                });

                console.log('Fetch Response:', userResponse);

                if (!userResponse.ok) {
                    throw new Error(`HTTP error! status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                console.log("User Data:", userData);
                setUserName(userData.data.name);
                setRole(userData.data.role);

                const rollResponse = await fetch('https://sparklenote.site/roll/me', {
                    method: 'GET',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    credentials: 'include',
                    mode: 'cors'
                });

                if (!rollResponse.ok) {
                    throw new Error(`HTTP error! status: ${rollResponse.status}`);
                }

                const rollData = await rollResponse.json();
                console.log("Roll Data:", rollData);
                setRolls(rollData.data || []);

            } catch (error) {
                console.error('Fetch error:', error);
                navigate('https://sparklenote.site/');
            }
        };

        fetchData();
    }, [navigate, token]);

    const teacherlogout = () => {
        localStorage.clear();
        navigate('https://sparklenote.site/');
    };

    const closeModal = () => {
        setIsCreateRollModalOpen(false);
    }

    return (
        <div className="my-page-container">
            <div className="greeting-container">
                <p className="greeting"><span>{userName}</span> 선생님, 안녕하세요</p>
                <CustomLogout className="logout-button" onClick={teacherlogout}>
                    <UserLogout>LOGOUT</UserLogout>
                </CustomLogout>
            </div>
            <div className="roll-list-container">
                <p className="highlighted-text">학급 목록</p>

                {Array.isArray(rolls) && rolls.length > 0 ? (
                    rolls.map((roll) => (
                        <RollItem
                            key={roll.rollId}
                            roll={roll}
                            role={role}
                        />
                    ))
                ) : (
                    <p>등록된 학급이 없습니다</p>
                )}
                <CustomButton2
                    onClick={() => setIsCreateRollModalOpen(true)}
                    className="create-roll"
                >
                    ✛ 학급 생성
                </CustomButton2>
            </div>

            {isCreateRollModalOpen && <CreateRollModal closeModal={closeModal} /> }

        </div>
    );
};

export default MyPage;