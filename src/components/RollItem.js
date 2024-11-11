import React, { useState, useEffect } from "react";
import '../styles/pages/MyPage.css'; // 스타일 import
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UrlCopyIcon, RollDelete, RollTittleEdit }from './MuiIcon';

const RollItem = ({ roll }) => {
    // 롤 제목 수정 모드 상태를 관리하는 state
    const { rollId, rollName, classCode, url } = roll;
    const [isEditing, setIsEditing] = useState(false);
    const [newRollName, setNewRollName] = useState(rollName);
    const token = localStorage.getItem("Authorization");

    // rollName이 변경될 때 newRollName도 업데이트하도록 useEffect 추가
    useEffect(() => {
        setNewRollName(rollName);
    }, [rollName]);

    const navigate = useNavigate();

    const enterRoll = () => {
        // 해당 rollId에 할당된 paper들을 불러오는 로직이 필요함
        navigate(`/paper/${rollId}`, { state: { rollId, rollName } })
        console.log(`롤링페이퍼 ${rollId}로 이동`);
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(`http://localhost:3000/${url}`).then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
        }).catch(err => {
            alert('복사 실패: ' + err);
        });
    }

    /**
      Clipboard API를 사용하여 url 텍스트를 클립보드에 복사
      navigator.clipboard를 통해 접근, writeText() 메서드 사용하여 텍스트 복사
      Promise: 비동기 작업을 수행하고 그 결과를 나타내는 객체
      텍스트 복사가 성공하면 then() 블록에서 추가 동작을 정의할 수 있고, 실패하면 catch() 블록에서 에러 처리
      비동기적으로 작동하며 성공 시 Promise를 반환
    */

    const handleUpdate = async () => {
        if (newRollName.trim() === "") {
            alert("학급명을 입력해주세요.");
            return;
        }

        if (newRollName !== rollName) {
            try {
                await axios.put(`http://localhost:8080/roll/${rollId}`,
                    { rollName: newRollName },
                    {
                        headers: {
                            "Authorization": token
                        }
                    }
                );
                alert('학급명이 수정되었습니다.');

                window.location.reload(); // 새로고침을 통해 롤 수정을 반영
                setIsEditing(false);
            } catch (error) {
                console.log('롤 제목 수정에 실패:');
            }
        }

        setIsEditing(false);
    };


    async function handleDelete(){
        const result = window.confirm('학급을 삭제하시겠습니까? 삭제된 학급은 복구할 수 없습니다.');
        if (result) {
            try {
                await axios.delete(`http://localhost:8080/roll/${rollId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                alert('학급이 삭제되었습니다.');

                // 상태 업데이트를 위해 페이지 새로고침
                window.location.reload(); // 새로고침을 통해 롤 삭제를 반영
                console.log('롤 삭제 성공');
            } catch (error) {
                console.error('롤 삭제 실패:', error);
                alert('학급 삭제 중 오류가 발생했습니다.');
            }
        } else {
            console.log('사용자가 롤 삭제를 취소했습니다.');
        }
    }

    return (
        <div className="roll-item" onClick={enterRoll}>
            <div onClick={(e) => {e.stopPropagation()}}>
                {isEditing ? (
                    <input
                        type="text"
                        value={newRollName}
                        onChange={(e) => setNewRollName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleUpdate(); // 엔터 키로 업데이트
                            }
                        }}
                        onBlur={() => {
                            // 포커스가 벗어날 때도 한 번만 업데이트 수행
                            if (newRollName !== rollName) {
                                handleUpdate();
                            } else {
                                setIsEditing(false);
                            }
                        }}
                    />
                ) : (
                    <h2 className="roll-name" onClick={enterRoll}>
                        {roll.rollName}
                    </h2>
                )}
                <div className="roll-code-container">
                    <p className="class-code">학급코드 : {classCode} {/* class_code 사용 */}</p>
                    <div className="button-group">
                        {/* URL 복사 버튼 */}
                        <p className="url-copy-button" onClick={copyUrl}><UrlCopyIcon /></p>

                        {/* 수정 버튼 */}
                        <p className="update-button" onClick={() => setIsEditing(true)}><RollTittleEdit /></p>

                        {/* 삭제 버튼 */}
                        <p className="delete-button" onClick={handleDelete}><RollDelete /></p>
                    </div>
                </div>
            </div>    
        </div>
    )
};
export default RollItem;
