import React, { useState } from "react";
import '../styles/pages/MyPage.css'; // 스타일 import
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Roll = ({ roll, onEnter, onCopy, onUpdate, onDelete }) => {
    // 롤 제목 수정 모드 상태를 관리하는 state
    const [isEditing, setIsEditing] = useState(false);
    const [newRollName, setNewRollName] = useState(roll.rollName);

    const navigate = useNavigate();

    const enterRoll = (rollId) => {
        // 해당 rollId에 할당된 paper들을 불러오는 로직이 필요함
        navigate('roll/${rollId}')
        console.log('롤링페이퍼 ${rollId}로 이동');
    }

    const copyUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            alert('복사 실패: ' + err);
        });
    }

    // Roll 제목을 input으로 바꾼다
    // roll 수정하는 API 호출
    // 백엔드에서 sse를 이용하는데 롤 제목이 수정된 것을 반영하기 위해서 새로고침 필요한가?
    const handleUpdate = async (rollId) => {
        try{
            await axios.put('/roll/update/${rollId}', { rollName: newRollName });
            alert('롤 제목이 업데이트되었습니다.');
            onUpdate(); // 업데이트 후 부모 컴포넌트의 데이터 갱신
            setIsEditing(false); // 편집 모드 종료
        }catch (error){
            console.log('롤 제목 수정에 실패', error);
        }
    }

    // roll 삭제하는 API 호출
    // 백엔드에서 sse를 이용하는데 롤 제목이 삭제된 것을 반영하기 위해서 새로고침 필요한가?
    const handleDelete = async (rollId) => {
        try{
            await axios.delete('/roll/delete/${rollId}');
            alert('정말 롤을 삭제하시겠습니까? 삭제된 롤은 복구되지 않습니다.');
            console.log('롤 삭제 성공');
        }catch (error) {
            console.error('롤 삭제 실패', error);
        }

    }

    const handleSave = () => {
        onUpdate()
    }
    
    return (
        <div className="roll-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newRollName}
                    onChange={(e) => setNewRollName(e.target.value)}
                    onBlur={() => handleUpdate(roll.rollId)} // 입력을 마치고 포커스가 벗어나면 업데이트
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdate(roll.rollId)} // 엔터 키로 업데이트
                />
            ) : (
                <h2 className="roll-name" onClick={() => setIsEditing(true)}>
                    {roll.rollName}
                </h2>
            )}
            <div className="roll-code-container">
                <p className="class-code">학급코드 : {roll.classCode} {/* class_code 사용 */}</p>
                <div className="button-group">
                    {/* URL 복사 버튼 */}
                    <p className="url-copy-button" onClick={() => onCopy(roll.url)}>URL 복사</p>

                    {/* 수정 버튼 */}
                    <p className="update-button" onClick={() => setIsEditing(true)}>수정</p>

                    {/* 삭제 버튼 */}
                    <p className="delete-button" onClick={() => onDelete()}>삭제</p>
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

export default Roll;