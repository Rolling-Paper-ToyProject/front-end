import React from "react";
import '../styles/pages/MyPage.css'; // 스타일 import

const RollItem = ({ roll }) => {
    // 수정 모드 상태를 관리하는 state
    // const [isEditing, setIsEditing] = useState(false);
    // const [newRollName, setNewRollName] = useState(roll.rollName);

    const { rollId, rollName, classCode, url } = roll;
    
    const copyUrl = () => {
        navigator.clipboard.writeText(url)
            .then(() => alert("URL이 클립보드에 복사되었습니다."))
            .catch((err) => alert("복사 실패: " + err));
    };
    
    /**
        Clipboard API를 사용하여 url 텍스트를 클립보드에 복사
        navigator.clipboard를 통해 접근, writeText() 메서드 사용하여 텍스트 복사
        Promise: 비동기 작업을 수행하고 그 결과를 나타내는 객체
        텍스트 복사가 성공하면 then() 블록에서 추가 동작을 정의할 수 있고, 실패하면 catch() 블록에서 에러 처리
        비동기적으로 작동하며 성공 시 Promise를 반환
    */
    
    return (
        <div className="roll-item">
            <h2 className="roll-name" /* onClick={() => onEnter(roll.rollId)} */>
                {rollName}
            </h2>
            <div className="roll-code-container">
                <p className="class-code">학급코드 : {classCode} {/* class_code 사용 */}</p>
                <div className="button-group">
                    {/* URL 복사 버튼 */}
                    <p className="url-copy-button" /* onClick={() => onCopy(roll.url)} */>URL 복사</p>

                    {/* 수정 버튼 */}
                    <p className="update-button" /* onClick={() => onUpdate(rollId)} */>수정</p>

                    {/* 삭제 버튼 */}
                    <p className="delete-button" /* onClick={() => onDelete(rollId)} */>삭제</p>
                </div>
            </div>
        </div>
    )
};

export default RollItem;