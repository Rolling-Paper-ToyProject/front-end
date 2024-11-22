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
                navigate('/');
                return;
            }

            try {
                // fetch로 시도해보기
                const userResponse = await fetch('https://sparklenote.site/user/profile', {
                    method: 'GET',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

                console.log('Fetch Response:', userResponse);

                if (!userResponse.ok) {
                    throw new Error(`HTTP error! status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                console.log("User Data:", userData);
                setUserName(userData.data.name);
                setRole(userData.data.role);

                // 롤 데이터도 fetch로 시도
                const rollResponse = await fetch('https://sparklenote.site/roll/me', {
                    method: 'GET',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

                if (!rollResponse.ok) {
                    throw new Error(`HTTP error! status: ${rollResponse.status}`);
                }

                const rollData = await rollResponse.json();
                console.log("Roll Data:", rollData);
                setRolls(rollData.data || []);

            } catch (error) {
                console.error('Fetch error:', error);
                navigate('/');
            }
        };

        fetchData();
    }, [navigate, token]);
    // ... 나머지 코드는 동일
};

export default MyPage;