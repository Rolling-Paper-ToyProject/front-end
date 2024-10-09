import { useState } from "react";
import { IoMdMore } from "react-icons/io"; // 아이콘 가져오기
import '../styles/components/PaperModal.css' // CSS 파일 가져오기

const PaperModal = () => {
    const [showOptions, setShowOptions] = useState(false); // 수정 및 삭제 옵션 가시성 상태

    const toggleOptions = () => {
        setShowOptions(!showOptions); // 옵션 토글
    };

    return (
        <div className="modal-overlay"> {/* 모달 배경 */}
            <div className="modal-content"> {/* 모달 내용 */}
            <IoMdMore onClick={toggleOptions} className="options-icon" /> {/* 옵션 아이콘 */}
                <p>롤링페이퍼 내용</p> {/* 롤링페이퍼 내용 */}

                {/* 수정 및 삭제 옵션 */}
                {showOptions && (
                    <div className="options-dropdown">
                        <button className="option-button">수정</button>
                        <button className="option-button">삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaperModal;