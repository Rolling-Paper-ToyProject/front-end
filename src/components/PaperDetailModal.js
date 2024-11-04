import { useState } from "react";
import { IoMdMore } from "react-icons/io"; // 아이콘 가져오기
import '../styles/components/PaperModal.css' // CSS 파일 가져오기

const PaperDetailModal = ({  }) => {
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [editedContent, setEditedContent] = useState(paper.content);
    const [showOptions, setShowOptions] = useState(false); // 수정 및 삭제 옵션 가시성 상태

    const toggleOptions = () => {
        setShowOptions(!showOptions); // 옵션 토글
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // 배경을 클릭했는지 확인
            closeModal();
        }    
    }

    // 수정 버튼을 눌렀을 때 수정 모드로 전환
    const handleEdit = () => {
        setIsEditing(true);
        setShowOptions(false);
    }

    // 저장 버튼을 눌렀을 때 수정된 내용을 반영하고 수정 모드 종료
    const handleSave = () => {
        if(!editedContent.trim()) {
            alert('수정할 내용을 입력해주세요.')
            return;
        }

        paper.content = editedContent; // 실제로 paper 객체의 content를 업데이트
        setIsEditing(false);
        alert("수정이 완료되었습니다.")
    }

    const handleEditCancel = () => {
        setEditedContent(paper.content); // 수정된 내용을 원래 내용으로 되돌리기
        setIsEditing(false);
    }

    // const editPaper = () => {
    //     if(!editedContent.trim()) {
    //         alert('수정할 내용을 입력해주세요.')
    //         return;
    //     }

    //     /** 
    //      * API 호출을 통해 수정된 내용을 서버로 전송하는 로직 필요 
    //      */

    //     alert('롤링페이퍼가 수정되었습니다.')
    //     closeModal();
    // }

    const handleDelete = () => {
        if (window.confirm('해당 페이퍼를 삭제하시겠습니까?')){
            
            /** 
             * API 호출을 통해 페이퍼를 삭제하는 로직 필요
             */

            alert('롤링페이퍼가 삭제되었습니다.');
            closeModal();
        }
    }   

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}> {/* 모달 배경 */}
            <div className="modal-content" onClick={(e) => {e.stopPropagation()}}> {/* 모달 내용 */}
            <IoMdMore onClick={toggleOptions} className="options-icon" /> {/* 옵션 아이콘 */}
                <p>From. {paper.author}</p> {/* 롤링페이퍼 내용 */}
                <p>{paper.content}</p>
                <button onClick={closeModal}>닫기</button>

                {/* 수정 및 삭제 옵션 */}
                {showOptions && (
                    <div className="options-dropdown">
                        <button className="paper-edit-button">수정</button>
                        <button className="paper-delete-button" onClick={() => handleDelete(paper)}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaperDetailModal;