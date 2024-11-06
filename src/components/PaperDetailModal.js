import { useState } from "react";
import { IoMdMore } from "react-icons/io"; // 아이콘 가져오기
import '../styles/components/Modal.css' // CSS 파일 가져오기
import axios from "axios";

const PaperDetailModal = ({ paper, closeModal }) => {
    const { paperId, content, studentName } = paper; 
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [newContent, setNewContent] = useState(content);
    const [showOptions, setShowOptions] = useState(false); // 수정 및 삭제 옵션 가시성 상태
    const token = localStorage.getItem("Authorization");

    const toggleOptions = () => {
        setShowOptions(!showOptions); // 옵션 토글
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) { // 배경을 클릭했는지 확인
            closeModal();
            setIsEditing(false);
        }    
    };

    // 수정 버튼을 눌렀을 때 수정 모드로 전환
    const handleEdit = (paperId) => {
        setIsEditing(true);
        setShowOptions(false);
    }

    // 저장 버튼을 눌렀을 때 수정된 내용을 반영하고 수정 모드 종료
    const handleUpdate = async (paparId) => {
        // if (newcontent.trim() === "") 도 동일
        if(!newContent.trim() /* 값이 falsy하므로 논리 부정 연산자로 인해 true */) {
            alert('수정할 내용을 입력해주세요.')
            return;
        }

        if (newContent !== content) {
            try {
                await axios.put(`http://localhost:8080/paper/update/${paperId}`,
                    { content: newContent },
                    { 
                        headers: {
                            "Authorization": token        
                        }   
                    }
                );
                alert("페이퍼 내용을 수정하였습니다.")
                window.location.reload();
                closeModal();
                setIsEditing(false);
            } catch (error) {
                console.log("페이퍼 내용 수정 실패", error)
                alert("페이퍼 내용이 수정되지 않았습니다. 다시 시도해주세요.")
            }
        }        
    }

    const handleEditCancel = () => {
        setNewContent(content); // 수정된 내용을 원래 내용으로 되돌리기
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

    const handleDelete = (paperId) => {
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
                <p>From. {studentName}</p> {/* 롤링페이퍼 내용 */}
                {isEditing ? (
                    <input 
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}                 
                    />
                ) : ( 
                    <div>
                        <p>{content}</p>
                        <button onClick={() => setIsEditing(true)}>저장</button>
                        <button onClick={() => setIsEditing(true)}>취소</button>
                    </div>
                )};

                {/* 수정 및 삭제 옵션 */}
                {showOptions && (
                    <div className="options-dropdown">
                        <button className="paper-edit-button" onClick={() => setIsEditing(true)}>수정</button>
                        <button className="paper-delete-button" onClick={() => handleDelete(paperId)}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaperDetailModal;