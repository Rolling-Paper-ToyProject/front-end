import React, { useEffect, useState } from "react";
import PaperItem from "../components/PaperItem";
import "../styles/pages/RollingPaperPage.css";
import CreatePaperModal from "../components/CreatePaperModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { LetterClick } from "../components/MuiButton";
import { BackToRollList } from "../components/MuiIcon";
import { API } from "../config";

const RollingPaperPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rollId, rollName, role } = location.state || {};
    const [papers, setPapers] = useState([]);
    const [isCreatePaperModalOpen, setIsCreatePaperModalOpen] = useState(false);

    useEffect(() => {
        const fetchPaperData = async () => {
            const currentToken = localStorage.getItem("Authorization");
            if (!currentToken) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate("/");
                return;
            }

            try {
                const paperResponse = await axios.get(
                    `${API.GET_PAPER}/${rollId}`,
                    { headers: { Authorization: currentToken } }
                );
                const paperData = paperResponse.data;
                console.log("Paper Data Response:", paperData);
                setPapers(paperData.data || []);
            } catch (error) {
                console.error('Error:', error);
                if (error.response?.status === 401) {
                    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                    navigate("/");
                }
            }
        }

        fetchPaperData();
    }, [rollId, navigate]);

    const showCreateModal = () => {
        setIsCreatePaperModalOpen(true);
    };

    const closeModal = () => {
        setIsCreatePaperModalOpen(false);
    };

    const addPaper = (newPaper) => {
        setPapers((prevPapers) => [...prevPapers, newPaper]);
    };

    return (
        <div>
            <div className="header">
                {role === "TEACHER" ? (
                    <LetterClick
                        className="roll-list-button"
                        onClick={() => navigate(`/mypage`)}
                        style={{ fontWeight: "bold", fontSize: "16px"}}
                    >
                        <BackToRollList />
                    </LetterClick>
                ) : ("")}
                <p
                    className="className"
                    style={{
                        paddingLeft: role === "TEACHER" ? "30px" : "100px",
                        paddingRight: role === "TEACHER" ? "30px" : "0"
                    }}
                >
                    {rollName}
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
                    papers.map((paper) => <PaperItem key={paper.paperId} paper={paper} role={role}/>)
                ) : (
                    <p style={{marginTop:"10px"}}>작성된 페이퍼가 없습니다</p>
                )}
            </div>
            {isCreatePaperModalOpen && (
                <CreatePaperModal
                    rollId={rollId}
                    closeModal={closeModal}
                    addPaper={addPaper}
                />
            )}
        </div>
    );
};

export default RollingPaperPage;