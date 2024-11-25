// src/pages/RollingPaperPageDev.js
import React, { useState } from "react";
import PaperItem from "../components/PaperItem";
import "../styles/pages/RollingPaperPage.css";
import CreatePaperModal from "../components/CreatePaperModal";
import { useNavigate } from "react-router-dom";
import { LetterClick } from "../components/MuiButton";
import { BackToRollList } from "../components/MuiIcon";

const RollingPaperPageDev = () => {
    const navigate = useNavigate();
    // 개발용 더미 데이터
    const dummyData = {
        rollId: 1,
        rollName: "4학년 1반",
        role: "TEACHER",  // "TEACHER" 또는 "STUDENT" 테스트
        currentStudentId: 1
    };

    // 개발용 더미 페이퍼 데이터
    const [papers, setPapers] = useState([
        {
            paperId: 1,
            content: "안녕하세요! 테스트 페이퍼입니다.",
            studentId: 1,
            studentName: "김학생",
            createdAt: "2024-03-20",
            updatedAt: "2024-03-20"
        },
        {
            paperId : 2,
            content: "안녕하세요! 테스트 페이퍼입니다.",
            studentId: 2,
            studentName: "이학생",
            createdAt: "2024-03-21",
            updatedAt: "2024-03-21"
        }
    ]);

    const [isCreatePaperModalOpen, setIsCreatePaperModalOpen] = useState(false);

    const showCreateModal = () => {
        setIsCreatePaperModalOpen(true);
    };

    const closeModal = () => {
        setIsCreatePaperModalOpen(false);
    };

    const addPaper = (newPaper) => {
        setPapers((prevPapers) => [...prevPapers, newPaper]);
    };

    const updatePaper = (paperId, newContent) => {
        setPapers((prevPapers) =>
            prevPapers.map((paper) =>
                paper.paperId === paperId ? { ...paper, content: newContent } : paper
            )
        );
    };

    const deletePaper = (paperId) => {
        setPapers((prevPapers) =>
            prevPapers.filter((paper) => paper.paperId !== paperId)
        );
    }

    return (
        <div>
            <div className="header">
                {dummyData.role === "TEACHER" ? (
                    <LetterClick
                        className="roll-list-button"
                        onClick={() => navigate(`/mypage-dev`)}  // 개발용 마이페이지로 이동
                        style={{ fontWeight: "bold", fontSize: "16px"}}
                    >
                        <BackToRollList />
                    </LetterClick>
                ) : ("")}
                <p
                    className="className"
                    style={{
                        paddingLeft: dummyData.role === "TEACHER" ? "30px" : "100px",
                        paddingRight: dummyData.role === "TEACHER" ? "30px" : "0"
                    }}
                >
                    {dummyData.rollName}
                </p>
                <LetterClick
                    className="add-paper-button"
                    onClick={showCreateModal}
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                >
                    작성
                </LetterClick>
            </div>

            <div className="paper-container">
                {Array.isArray(papers) && papers.length > 0 ? (
                    papers.map((paper) =>
                        <PaperItem
                            key={paper.paperId}
                            paper={paper}
                            role={dummyData.role}
                            currentStudentId={dummyData.currentStudentId}
                            onUpdatePaper={updatePaper}
                            onDeletePaper={deletePaper}
                        />)
                ) : (
                    <p style={{marginTop:"10px"}}>작성된 페이퍼가 없습니다</p>
                )}
            </div>

            {isCreatePaperModalOpen && (
                <CreatePaperModal
                    rollId={dummyData.rollId}
                    closeModal={closeModal}
                    addPaper={addPaper}
                />
            )}
        </div>
    );
};

export default RollingPaperPageDev;