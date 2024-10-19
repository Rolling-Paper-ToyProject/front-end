import React, { useState } from "react";
import RollingPaperDetail from "../components/RollingPaperDetail";
import '../styles/pages/RollingPaperPage.css'
import CreatePaperModal from "../components/CreatePaperModal";

const RollingPaperPage = () => {
    
    // 모달 상태 관리
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // 모달을 여는 함수
    const showCreatePaperModal = () => {
        setIsCreateModalOpen(true);
    } 

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsCreateModalOpen(false);
    }

    const handleAddPaper = () => {
        
    }

    return (
        <div>
            <div className="header">
                <p className="className">OO초등학교 4-1</p>
                <button className="add-paper-button" onClick={showCreatePaperModal}>페이퍼 작성</button>
            </div>

            {/* RollingPaperDetail 컴포넌트 */}
            <RollingPaperDetail />

            {/* CreatePaperModal 컴포넌트 */}
            {isCreateModalOpen && <CreatePaperModal closeModal={closeModal} />}
        </div>
    )
    
}

export default RollingPaperPage;