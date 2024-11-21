import { useState, useEffect } from "react";
import "../styles/pages/RollingPaperPage.css";
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper }) => {
  const { paperId, content, authorName, authorRole } = paper;
  const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);

  // 랜덤 각도 설정
  const randomRotation = () => {
    // -5도에서 5도 사이의 랜덤 각도
    return Math.floor(Math.random() * 10) - 5;
  };

  const showPaperDetailModal = (paper) => {
    setIsPaperDetailModalOpen(true);
  };

  const closePaperDetailModal = () => {
    setIsPaperDetailModalOpen(false);
  };

  return (
    <>
      <div>
        <div
          key={paperId}
          onClick={() => showPaperDetailModal(paper)}
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
          />
        )}
      </div>
    </>
  );
};

export default PaperItem;
