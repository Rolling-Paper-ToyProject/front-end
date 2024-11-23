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
    // const queryParams = new URLSearchParams(location.search);
    // const rollId = queryParams.get("rollId");
    // const rollName = queryParams.get("rollName");
    // const role = queryParams.get("role");
    const [papers, setPapers] = useState([]);
    const [isCreatePaperModalOpen, setIsCreatePaperModalOpen] = useState(false);
    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchPaperData = async () => {
            if (!token) {
                alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
                navigate("/");
                return;
            }

            // const currentToken = localStorage.getItem("Authorization"); // 항상 최신 토큰 가져오기

            // if (!currentToken) {
            //   console.log("새로고침 후 토큰 없음: navigate('/') 호출");
            //   alert("로그인 상태가 아닙니다. 로그인 후 이용해주세요.");
            //   navigate("/");
            //   return;
            // }

            try {
                // 페이퍼 정보 가져오기
                const paperResponse = await axios.get(
                  API.GET_PAPER(rollId),
                  { headers: { Authorization: token } }
                );
                const paperData = paperResponse.data;
                console.log("Paper Data Response:", paperData);
                setPapers(paperData.data || []); // 빈 배열 fallback 추가
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchPaperData();
    }, [rollId, token]);

    useEffect(() => {
      localStorage.setItem("Authorization", token);
    }, [token]);

    // 모달을 여는 함수
    const showCreateModal = () => {
        setIsCreatePaperModalOpen(true);
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsCreatePaperModalOpen(false);
    };

    const addPaper = (newPaper) => {
      setPapers((prevPapers) => [...prevPapers, newPaper]);
    };

    const updatePaper = (paperId, newContent) => {
      setPapers((prevPapers) => 
        prevPapers.map((paper) => 
          paper.paperId === paperId? { ...paper, content: newContent } : paper
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
          {role === "TEACHER" ? (
            <LetterClick
              className="roll-list-button"
              onClick={() => navigate(`/mypage`)}
              style={{ fontWeight: "bold", fontSize: "16px"}}
            >
              < BackToRollList />
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
          {/* RollingPaperDetail 컴포넌트 */}
          {Array.isArray(papers) && papers.length > 0 ? (
            papers.map((paper) => 
            <PaperItem 
              key={paper.paperId} 
              paper={paper} 
              role={role}
              onUpdatePaper={updatePaper}
              onDeletePaper={deletePaper}
            />)
          ) : (
            <p style={{marginTop:"10px"}}>작성된 페이퍼가 없습니다</p>
          )}
        </div>
        {/* CreatePaperModal 컴포넌트 */}
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
