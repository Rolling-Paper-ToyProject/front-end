import { useState, useEffect } from "react";
import "../styles/components/Modal.css"; // CSS 파일 가져오기
import axios from "axios";
import { LetterClick } from "../components/MuiButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const UpdateRollModal = ({ closeModal, roll }) => {
  const token = localStorage.getItem("Authorization");
  const [rollTitle, setRollTitle] = useState("");

  // 컴포넌트가 처음 렌더링될 때 rollTitle 초기화
  useEffect(() => {
    if (roll && roll.rollName) {
      setRollTitle(roll.rollName);
    }
  }, [roll]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const updateRoll = async () => {
    try {
      await axios.put(
        `http://localhost:8080/roll/${roll.rollId}`,
        { rollName: rollTitle },
        { headers: { Authorization: token } }
      );
      alert("학급명이 수정되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("롤 제목 수정에 실패:", error);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        e.stopPropagation();
        handleOverlayClick(e);
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="update-title" style={{ marginBottom: "5px" }}>
          <BorderColorIcon style={{ marginRight: "8px", float: "left" }} />
          <h3 style={{ width: "150px" }}>학급명 수정</h3>
        </div>
        <input
          type="text"
          value={rollTitle}
          onChange={(e) => setRollTitle(e.target.value)}
          placeholder="새 학급명을 입력해주세요" // placeholder를 단순한 안내 텍스트로 사용
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateRoll();
            }
          }}
        />
        <div className="modal-actions">
          <LetterClick onClick={closeModal}>취소</LetterClick>
          <LetterClick
            className="roll-create-button"
            onClick={updateRoll}
            disabled={!rollTitle.trim()}
          >
            등록
          </LetterClick>
        </div>
      </div>
    </div>
  );
};

export default UpdateRollModal;
