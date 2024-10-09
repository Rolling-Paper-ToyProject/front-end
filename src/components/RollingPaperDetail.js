import { useState, useEffect } from "react";
import PaperModal from "./PaperModal";
import '../styles/components/RollingPaperDetail.css'

const RollingPaperDetail = () =>  {
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [papers, setPapers] = useState([]);

    const paper = [
        {}
    ]

    useEffect(() => {
        
        const fetchMessage = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/rollingPapers/${studentId}') 
            } catch { 
                // console.error(error);
            } finally {
                setLoading(true);
            }
        };
        
        const dummyPapers = Array.from({ length: 12},(_, index) => ({
            id: index + 1,
            content: `롤링페이퍼 내용 ${index + 1}`,
        }));
        setPapers(dummyPapers);

        // fetchPapers();
    })

    const showPaperModal = () => {
        setIsModalOpen(true);
    }

    return (
        <div className="paper-container">
            
            {!loading && <h1 className="loading">잠시만 기다려주세요...</h1>}
            
            <div className="paper-grid">
                {/* 롤링페이퍼 안 선생님 및 학생들이 남긴 글이 보이게끔 해줘야 함. */}
                {/* 반복문으로 데이터를 가져와서 보여줘야함. */}
                {papers.map((paper)=> (
                    <div key={paper.id} onClick={showPaperModal} className="paper-box">
                        <p>{paper.content}</p>
                    </div>
                ))}
            </div>

            {isModalOpen && <PaperModal />}
        </div>
    );
};

export default RollingPaperDetail;