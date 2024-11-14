import { useState } from "react";
import '../styles/components/Modal.css' // CSS 파일 가져오기
import axios from "axios";

const PaperDetailModal = ({ paper, closeModal }) => {
    const { content, authorName, paperId } = paper;
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [newContent, setNewContent] = useState(content);
    const token = localStorage.getItem("Authorization");

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // 배경을 클릭했는지 확인
            closeModal();
        }    
    }

    // 저장 버튼을 눌렀을 때 수정된 내용을 반영하고 수정 모드 종료
    const handleSave = async () => {
        if(!newContent.trim()) {    // trim() 메서드는 문자열 양 끝의 공백을 제거하면서 원본 문자열을 수정하지 않고 새로운 문자열을 반환
            alert('수정할 내용을 입력해주세요.')
            return;
        }

        if (newContent !== content) {
            try {
                await axios.put(`http://localhost:8080/paper/${paperId}`, { content: newContent },
                    { 
                        headers: {
                            "Authorization": token        
                        }   
                    }
                );
                alert("페이퍼 내용을 수정하였습니다.")
                window.location.reload();
            } catch (error) {
                console.log("페이퍼 내용 수정 실패", error)
                alert("페이퍼 내용이 수정되지 않았습니다. 다시 시도해주세요.")
            }
        }        
    }

    const handleCancelUpdate = () => {
        setNewContent(content); // 수정된 내용을 원래 내용으로 되돌리기
        setIsEditing(false);
    }

    const handleDelete = async () => {
        if (window.confirm('해당 페이퍼를 삭제하시겠습니까?')){
            try {
                await axios.delete(`http://localhost:8080/paper/${paperId}`, {
                    headers: {
                        "Authorization": token
                    }
                })
                console.log('롤링페이퍼 삭제 성공');
                alert('롤링페이퍼가 삭제되었습니다.');
                // closeModal();
                window.location.reload();
            } catch (error) {
                console.log('롤링페이퍼 삭제 실패:', error);
                alert('페이퍼 삭제 중 오류가 발생했습니다');
                return;
            }
        }
    }   

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}> {/* 모달 배경 */}
            <div className="modal-content" onClick={(e) => {e.stopPropagation()}}> {/* 모달 내용 */}
            {/* <IoMdMore onClick={toggleOptions} className="options-icon" /> 옵션 아이콘 */}
                <p>From. {authorName}</p> {/* 롤링페이퍼 내용 */}
                {isEditing ? (
                    <>
                        <input 
                            type="text"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}                 
                        />
                        <div className="paper-modal-button">
                            <button className="paper-edit-save-button" onClick={handleSave}>저장</button>
                            <button className="paper-edit-cancel-button" onClick={handleCancelUpdate}>취소</button>
                        </div>
                    </>
                ) : ( 
                    <>
                        <p>{content}</p>
                        <div className="paper-modal-button">
                            <button className="paper-edit-button" onClick={() => setIsEditing(true)}>수정</button>
                            <button className="paper-delete-button" onClick={() => handleDelete()}>삭제</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaperDetailModal;