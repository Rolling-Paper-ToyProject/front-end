import { useState } from "react";
import { IoMdMore } from "react-icons/io"; // 아이콘 가져오기
import '../styles/components/Modal.css' // CSS 파일 가져오기

const EditPaperModal = ({ closeModal }) => {
    const [showOptions, setShowOptions] = useState(false); // 수정 및 삭제 옵션 가시성 상태

    const toggleOptions = () => {
        setShowOptions(!showOptions); // 옵션 토글
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // 배경을 클릭했는지 확인
            closeModal();
        }    
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}> {/* 모달 배경 */}
            <div className="modal-content" onClick={(e) => {e.stopPropagation()}}> {/* 모달 내용 */}
            <IoMdMore onClick={toggleOptions} className="options-icon" /> {/* 옵션 아이콘 */}
                <p>롤링페이퍼 내용</p> {/* 롤링페이퍼 내용 */}

                {/* 수정 및 삭제 옵션 */}
                {showOptions && (
                    <div className="options-dropdown">
                        <button className="paper-edit-button">수정</button>
                        <button className="paper-delete-button">삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditPaperModal;