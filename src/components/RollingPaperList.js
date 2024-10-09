import React, { useState } from "react";
import '../styles/pages/MyPage.css'; // 스타일 import

const RollingPaperList = () => {
    const papers = [
        { id: 1, name: 'OO초등학교 4-1', code: 'XXXX' },
        { id: 2, name: 'OO초등학교 4-2', code: 'YYYY' }
        // 추가적인 롤링페이퍼 항목들...
    ];
    const 롤링페이퍼입장 = () => {
        // /pages/RollingPagerDetail로 들어가야 함
    }

    const updateRollingPaperName = () => {
        // 업데이트 로직
    };

    const deleteRollingPaper = () => {
        // 삭제 로직
    };

    const createRollingPaper = () => {
        // 롤링페이퍼 배열 안에 요소 추가
    };

    return (
        <div className="rolling-paper-list-container"> {/* 롤링페이퍼 목록 컨테이너 */}
            {papers.map((paper, index) => (
                <div key={index} className="rolling-paper-item"> {/* 각 롤링페이퍼 아이템 */}
                    <h2 className="rolling-paper-name" onClick={롤링페이퍼입장}>{paper.name}</h2>
                    <div className="rolling-paper-code-container"> {/* 학급 코드 컨테이너 */}
                        <p className="class-code">학급코드 : {paper.code}</p>
                        <div className="button-group"> {/* 버튼 그룹 */}
                            <p className="update-button" onClick={updateRollingPaperName}>수정</p>
                            <p className="delete-button" onClick={deleteRollingPaper}>삭제</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="create-rolling-paper-container"> {/* 롤링페이퍼 생성 컨테이너 */}
                <p className="create-rolling-paper" onClick={createRollingPaper}>롤링페이퍼 생성</p>
            </div>
        </div>
    );
};

export default RollingPaperList;