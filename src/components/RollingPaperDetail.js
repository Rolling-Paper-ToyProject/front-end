import { useState, useEffect } from "react";
import '../styles/components/RollingPaperDetail.css';
import PaperDetailModal from "./PaperDetailModal";

const RollingPaperDetail = () =>  {
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState([]);
    const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);
    const [papers, setPapers] = useState([]);
    const [selectedPaper, setSelectedPaper] = useState(null);

    useEffect(() => {
        
        const fetchMessage = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/rollingPapers/${studentId}') 
            } catch { 
                // console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        const dummyPapers = Array.from({ length: 12},(_, index) => ({
            id: index + 1,
            author: `학생${index + 1}`,
            content: `롤링페이퍼 내용 ${index + 1}`,
        }));
        setPapers(dummyPapers);

        // fetchPapers();
    }, []);

    const showPaperDetailModal = (paper) => {
        setSelectedPaper(paper);
        setIsPaperDetailModalOpen(true);
    };

    const closeModal = () => {
        setIsPaperDetailModalOpen(false);
        setSelectedPaper(null);
    };

    return (
        <div className="paper-container">
            
            {!loading && <h1 className="loading">잠시만 기다려주세요...</h1>}
            
            <div className="paper-grid">
                {/* 롤링페이퍼 안 선생님 및 학생들이 남긴 글이 보이게끔 해줘야 함. */}
                {/* 반복문으로 데이터를 가져와서 보여줘야함. */}
                {papers.map((paper)=> (
                    <div key={paper.id} onClick={() => showPaperDetailModal(paper)} className="paper-box">
                        <p>{paper.content}</p>
                    </div>
                ))}
            </div>

            {isPaperDetailModalOpen && (
                <PaperDetailModal 
                    closeModal={closeModal} 
                    paperContent={selectedPaper?.content} // 선택된 페이퍼 내용 전달
                />
            )}
        </div>
    );
};

export default RollingPaperDetail;