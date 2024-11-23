import { useState, useEffect } from "react";
import "../styles/pages/RollingPaperPage.css";
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper, onUpdatePaper, onDeletePaper }) => {
  const { paperId, content, authorName, authorRole } = paper;
  const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);

  // 랜덤 각도 설정
  const randomRotation = () => {
    // -5도에서 5도 사이의 랜덤 각도
    return Math.floor(Math.random() * 10) - 5;
  };

  const showPaperDetailModal = () => {
    setIsPaperDetailModalOpen(true);
  };

  const closePaperDetailModal = () => {
    setIsPaperDetailModalOpen(false);
  };

  return (
    <>
      <div>
        {authorRole === "TEACHER" ? (
          <p className="fromName">From. {`${authorName} 선생님`}</p>
        ) : (
          <p className="fromName">From. {authorName}</p>
        )}
        <div
          key={paperId}
          onClick={() => showPaperDetailModal()}
          className="paper-box"
          style={{ transform: `rotate(${randomRotation()}deg)` }} // 각도 적용
        >
          <p className="fromName">From. {authorName}</p>
          <p className="roll-content">{content}</p>
        </div>

        {isPaperDetailModalOpen && (
          <PaperDetailModal
            closeModal={closePaperDetailModal}
            paper={paper} // 선택된 페이퍼 내용 전달
            onUpdatePaper={onUpdatePaper}
            onDeletePaper={onDeletePaper}
          />
        )}
      </div>
    </>
  );
};

export default PaperItem;
