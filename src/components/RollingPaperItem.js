import React from "react";
import '../styles/pages/MyPage.css'; // 스타일 import

const RollingPaperItem = ({ roll, onEnter, onCopy, onUpdate, onDelete, copyMessage }) => {
    return (
        <div className="rolling-paper-item">
            <h2 className="rolling-paper-name" onClick={() => onEnter(roll.rollId)}>
                {roll.rollName}
            </h2>
            <div className="rolling-paper-code-container">
                <p className="class-code">학급코드 : {roll.classCode} {/* class_code 사용 */}</p>
                <div className="button-group">
                    {/* URL 복사 버튼 */}
                    <p className="url-copy-button" onClick={() => onCopy(roll.url)}>URL 복사</p>

                    {/* 수정 버튼 */}
                    <p className="update-button" onClick={() => onUpdate(roll.rollId)}>수정</p>

                    {/* 삭제 버튼 */}
                    <p className="delete-button" onClick={() => onDelete(roll.rollId)}>삭제</p>
                    {copyMessage && <p>{copyMessage}</p>}
                </div>
            </div>
        </div>
    )
    
    // const rolls = [
    //     // 더미 롤링페이퍼 설정 
    //     { id: 1, name: 'OO초등학교 4-1', code: 'XXXX' },
    //     { id: 2, name: 'OO초등학교 4-2', code: 'YYYY' }
    //     // 추가적인 롤링페이퍼 항목들
    // ];
    // const [copySuccess, setCopySuccess] = useState('');

    // const 롤링페이퍼입장 = () => {
    //     // /pages/RollingPagerDetail로 들어가야 함
    // }

    // const urlCopy = () => {
    //     const url = window.location.href; // 현재 페이지의 URL을 가져옴
    //     navigator.clipboard.writeText(url).then(() => {
    //         setCopySuccess('URL이 클립보드에 복사되었습니다.');
    //     }).catch(err => {
    //         setCopySuccess('복사 실패: ' + err);
    //     });
    // };

    // const updateRollingPaperName = () => {
    //     // 업데이트 로직
    // };

    // const deleteRollingPaper = () => {
    //     // 삭제 로직
    // };

    // const createRollingPaper = () => {
    //     // 롤링페이퍼 배열 안에 요소 추가
    // };

    // return (
    //     <div className="rolling-paper-list-container"> {/* 롤링페이퍼 목록 컨테이너 */}
    //         {rolls.map((roll, index) => (
    //             <div key={index} className="rolling-paper-item"> {/* 각 롤링페이퍼 아이템 */}
    //                 <h2 className="rolling-paper-name" onClick={롤링페이퍼입장}>{roll.name}</h2>
    //                 <div className="rolling-paper-code-container"> {/* 학급 코드 컨테이너 */}
    //                     <p className="class-code">학급코드 : {roll.code}</p>
    //                     <div className="button-group"> {/* 버튼 그룹 */}
    //                         <p className="url-copy-button" onClick={updateRollingPaperName}>URL 복사</p>
    //                         <p className="update-button" onClick={updateRollingPaperName}>수정</p>
    //                         <p className="delete-button" onClick={deleteRollingPaper}>삭제</p>
    //                     </div>
    //                 </div>
    //                 {copySuccess && <p>{copySuccess}</p>}
    //             </div>
    //         ))}
    //         <div className="create-rolling-paper-container"> {/* 롤링페이퍼 생성 컨테이너 */}
    //             <p className="create-rolling-paper" onClick={createRollingPaper}>롤링페이퍼 생성</p>
    //         </div>
    //     </div>
    // );
};

export default RollingPaperItem;