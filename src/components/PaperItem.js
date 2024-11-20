import { useState, useEffect } from "react";
import "../styles/pages/RollingPaperPage.css";
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper }) => {
  const { paperId, content, authorName, authorRole } = paper;
  const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);

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
