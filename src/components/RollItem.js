import React, { useState } from "react";
import "../styles/pages/MyPage.css"; // 스타일 import
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UrlCopyIcon, RollDelete, RollTittleEdit } from "./MuiIcon";
import UpdateRollModal from "../components/UpdateRollModal";

const RollItem = ({ roll }) => {
  const { rollId, rollName, classCode, url } = roll;
  // 롤 제목 수정 모드 상태를 관리하는 state
  const [isUpdateRollModalOpen, setIsUpdateRollModalOpen] = useState(false);
  const token = localStorage.getItem("Authorization");

  const navigate = useNavigate();

  const enterRoll = () => {
    navigate(`/paper/${rollId}`, { state: { rollId, rollName } });
    console.log(`롤링페이퍼 ${rollId}로 이동`);
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/${url}`)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        alert("복사 실패: " + err);
      });
  };

  // 학급명 수정 모달 닫기
  const closeModal = () => {
    setIsUpdateRollModalOpen(false);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "학급을 삭제하시겠습니까? 삭제된 학급은 복구할 수 없습니다."
      )
    ) {
      try {
        await axios.delete(`http://localhost:8080/roll/${rollId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("학급이 삭제되었습니다.");

        // 상태 업데이트를 위해 페이지 새로고침
        window.location.reload(); // 새로고침을 통해 롤 삭제를 반영
        console.log("롤 삭제 성공");
      } catch (error) {
        console.error("롤 삭제 실패:", error);
        alert("학급 삭제 중 오류가 발생했습니다.");
      }
    } else {
      console.log("사용자가 롤 삭제를 취소했습니다.");
    }
  };

  return (
    <div className="roll-item" onClick={enterRoll}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="roll-name" onClick={enterRoll}>
          {rollName}
        </h2>
        <div className="roll-code-container">
          <p className="class-code">
            학급코드 : {classCode} {/* class_code 사용 */}
          </p>
          <div className="button-group">
            {/* URL 복사 버튼 */}
            <p className="url-copy-button" onClick={copyUrl}>
              <UrlCopyIcon />
            </p>

            {/* 수정 버튼 */}
            <p
              className="update-button"
              onClick={() => setIsUpdateRollModalOpen(true)}
            >
              <RollTittleEdit />
            </p>

            {/* 삭제 버튼 */}
            <p className="delete-button" onClick={handleDelete}>
              <RollDelete />
            </p>
          </div>
        </div>
      </div>
      {/* 수정 모달 */}
      {isUpdateRollModalOpen && (
        <UpdateRollModal closeModal={closeModal} roll={roll} />
      )}
    </div>
  );
};
export default RollItem;
