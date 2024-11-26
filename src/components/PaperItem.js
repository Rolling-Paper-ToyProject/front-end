import { useState, useEffect } from "react";
import "../styles/pages/RollingPaperPage.css";
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper, role, currentStudentId ,onUpdatePaper, onDeletePaper }) => {
  const { paperId, content, authorName, authorRole, studentId } = paper;
  const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때만 랜덤 각도를 설정합니다.
    setRotation(Math.floor(Math.random() * 10) - 5);
  }, []); // 빈 의존성 배열이므로 최초 한 번만 실행됩니다.

  const showPaperDetailModal = () => {
    setIsPaperDetailModalOpen(true);
  };

  const closePaperDetailModal = () => {
    setIsPaperDetailModalOpen(false);
  };

  return (
    <>
      <div
        key={paperId}
        onClick={showPaperDetailModal}
        className="paper-box"
        style={{ transform: `rotate(${rotation}deg)` }} // 고정된 랜덤 각도 적용
      >
      
        <p className="fromName">{`From. ${authorRole === "TEACHER" ? ( "선생님" ) : ( authorName )}`}</p>
        <p className="roll-content">{content}</p>
      </div>

      {isPaperDetailModalOpen && (
        <PaperDetailModal
          closeModal={closePaperDetailModal}
          paper={paper} // 선택된 페이퍼 내용 전달
          role={role}
          currentStudentId={currentStudentId}
          onUpdatePaper={onUpdatePaper}
          onDeletePaper={onDeletePaper}
        />
      )}
    </>
  );
};

export default PaperItem;
