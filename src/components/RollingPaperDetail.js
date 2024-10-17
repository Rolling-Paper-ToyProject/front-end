import { useState, useEffect } from "react";
import '../styles/components/RollingPaperDetail.css';
import CreatePaperModal from "./CreatePaperModal";
import EditPaperModal from "./EditPaperModal";

const RollingPaperDetail = () =>  {
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [papers, setPapers] = useState([]);

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

    const showCreatePaperModal = () => {
        setIsCreateModalOpen(true);
    };
    
    const showEditPaperModal = () => {
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        if (isCreateModalOpen) {
            setIsCreateModalOpen(false)
        } else if (isEditModalOpen) {
            setIsEditModalOpen(false)
        } else {
            return;
        }
    };

    return (
        <div className="paper-container">
            
            {!loading && <h1 className="loading">잠시만 기다려주세요...</h1>}
            
            <div className="paper-grid">
                {/* 롤링페이퍼 안 선생님 및 학생들이 남긴 글이 보이게끔 해줘야 함. */}
                {/* 반복문으로 데이터를 가져와서 보여줘야함. */}
                {papers.map((paper)=> (
                    <div key={paper.id} onClick={showEditPaperModal} className="paper-box">
                        <p>From. {paper.author}</p>
                        <p>{paper.content}</p>
                    </div>
                ))}
            </div>

            {isCreateModalOpen && <CreatePaperModal closeModal={closeModal} />}    
            {isEditModalOpen && <EditPaperModal closeModal={closeModal} />}
        </div>
    );
};

export default RollingPaperDetail;