import React, { useEffect, useState } from "react";
import PaperItem from "../components/PaperItem";
import '../styles/pages/RollingPaperPage.css'
import CreatePaperModal from "../components/CreatePaperModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RollingPaperPage = () => {

    const location = useLocation();
    const { rollId, rollName } = location.state || {};
    const navigate = useNavigate();
    const [papers, setPapers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchPaperData = async () => {
            
            if(!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.")
                navigate('/');
                return;
            }

            try {
                // 사용자 정보 가져오기

                // 페이퍼 정보 가져오기
                const paperResponse = await axios.get(`http://localhost:8080/paper/rolls/${rollId}`, {
                    headers: {
                        "Authorization": token
                    }
                });

                const paperData = await paperResponse.json();
                console.log("Paper Data Response:", paperData);
                setPapers(paperData.data || []); // 빈 배열 fallback 추가
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }, [rollId]);

    // 모달을 여는 함수
    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    } 

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsCreateModalOpen(false);
    }

    return (
        <div>
            <div className="header">
                <p className="className">{rollName}</p>
                <button className="add-paper-button" onClick={showCreateModal}>페이퍼 작성</button>
            </div>

            <div className="paper-container">
                {/* RollingPaperDetail 컴포넌트 */}
                {Array.isArray(papers) && papers.length > 0 ? (
                    papers.map((paper) => (
                        <PaperItem 
                            key={paper.paperId}
                            paper={paper}
                        />
                    ))
                ) : (
                    <p>작성된 페이퍼가 없습니다</p>
                )}
            </div>
            {/* CreatePaperModal 컴포넌트 */}
            {isCreateModalOpen && <CreatePaperModal closeModal={closeModal}/>}
        </div>
    )
}

export default RollingPaperPage;