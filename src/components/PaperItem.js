import { useState, useEffect } from "react";
import '../styles/pages/RollingPaperPage.css';
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = (paper) =>  {
    const { paperId, content } = paper; 
    const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);

    const showPaperDetailModal = (paper) => {
        setSelectedPaper(paper);
        setIsPaperDetailModalOpen(true);
    };

    const closePaperDetailModal = () => {
        setIsPaperDetailModalOpen(false);
        setSelectedPaper(null);
    };

    return (
        <>
            <div key={paperId} onClick={() => showPaperDetailModal(paper)} className="paper-box">
                <p>{content}</p>
            </div>

            {isPaperDetailModalOpen && (
                <PaperDetailModal 
                    closeModal={closeModal}
                    studentName={studentName} 
                    paperContent={content} // 선택된 페이퍼 내용 전달
                />
            )}
        </>
    );
};

export default PaperItem;