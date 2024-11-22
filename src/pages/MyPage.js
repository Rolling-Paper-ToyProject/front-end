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
            // 디버깅용 로그 추가
            console.log('Current API URLs:', {
                profile: API.TEACHER_PROFILE,
                roll: API.GET_ROLL
            });
            console.log('Current token:', token);

            if (!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate('/');
                return;
            }

            try {
                // axios 기본 설정 확인
                console.log('Axios defaults:', axios.defaults);

                // 사용자 정보 가져오기
                console.log('Requesting profile from:', API.TEACHER_PROFILE);
                const userResponse = await axios.get(
                    API.TEACHER_PROFILE,
                    {
                        headers: {
                            "Authorization": token,
                            // CORS 관련 헤더 추가
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                );

                console.log('User Response:', userResponse);

                if (userResponse.status !== 200) {  // 조건문 수정
                    throw new Error('Failed to fetch user info');
                }

                const userData = userResponse.data;
                console.log("User Info Response:", userData);
                setUserName(userData.data.name);
                setRole(userData.data.role);

                // 롤 데이터 가져오기
                console.log('Requesting roll data from:', API.GET_ROLL);
                const rollResponse = await axios.get(
                    API.GET_ROLL,
                    {
                        headers: {
                            "Authorization": token,
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                );

                if (rollResponse.status !== 200) {  // 조건문 수정
                    throw new Error('Failed to fetch roll data');
                }

                const rollData = rollResponse.data;
                console.log("Roll Data Response:", rollData);
                setRolls(rollData.data || []);

            } catch (error) {
                console.error('Error details:', {
                    message: error.message,
                    response: error.response,
                    request: error.request,
                    config: error.config
                });
                navigate('/');
            }
        };

        fetchData();
    }, [navigate, token]);  // token 의존성 추가

    // ... 나머지 코드는 동일
};

export default MyPage;