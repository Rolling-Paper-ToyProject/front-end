import { useState, useEffect } from "react";
import '../styles/pages/RollingPaperPage.css';
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper }) =>  {
    const { paperId, content, studentName } = paper; 
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const token = localStorage.getItem("Authorization");

    const showModal = (paperId) => {
        setIsDetailModalOpen(true);
    };

    const closeModal = (paperId) => {
        setIsDetailModalOpen(false);
    };

    return (
        <>
            <div key={paperId} onClick={() => showModal(paperId)} className="paper-box">
                <p>{content}</p>
            </div>

            {isDetailModalOpen && (
                <PaperDetailModal 
                    paper={paper}
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default PaperItem;