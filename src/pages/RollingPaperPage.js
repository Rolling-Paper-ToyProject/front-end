import React, { useEffect, useState } from "react";
import PaperItem from "../components/PaperItem";
import "../styles/pages/RollingPaperPage.css";
import CreatePaperModal from "../components/CreatePaperModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CustomLogout } from "../components/MuiButton";
import { BackToRollList } from "../components/MuiIcon";
import { API } from "../config";

const RollingPaperPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rollId, rollName, role } = location.state || {};
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

            try {
                // 페이퍼 정보 가져오기
                const paperResponse = await axios.get(
                    API.GET_PAPER,
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

    // 모달을 여는 함수
    const showCreateModal = () => {
        setIsCreatePaperModalOpen(true);
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsCreatePaperModalOpen(false);
    };


    return (
      <div>
        <div className="header">
          {role === "TEACHER" ? (
            <CustomLogout
              className="roll-list-button"
              onClick={() => navigate(`/mypage`)}
              style={{ fontWeight: "bold", fontSize: "16px"}}
            >
              < BackToRollList />
            </CustomLogout>
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
          <CustomLogout
            className="add-paper-button"
            onClick={showCreateModal}
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            작성
          </CustomLogout>
        </div>

        <div className="paper-container">
          {/* RollingPaperDetail 컴포넌트 */}
          {Array.isArray(papers) && papers.length > 0 ? (
            papers.map((paper) => <PaperItem key={paper.paperId} paper={paper} role={role}/>)
          ) : (
            <p>작성된 페이퍼가 없습니다</p>
          )}
        </div>
        {/* CreatePaperModal 컴포넌트 */}
        {isCreatePaperModalOpen && (
          <CreatePaperModal rollId={rollId} closeModal={closeModal} />
        )}
      </div>
    );
  };

export default RollingPaperPage;
