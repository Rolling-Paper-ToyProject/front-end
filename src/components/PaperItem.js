import { useState, useEffect } from "react";
import "../styles/pages/RollingPaperPage.css";
import PaperDetailModal from "./PaperDetailModal";

const PaperItem = ({ paper, role, currentStudentId ,onUpdatePaper, onDeletePaper }) => {
  const { paperId, content, authorName, authorRole, studentId } = paper;
  const [isPaperDetailModalOpen, setIsPaperDetailModalOpen] = useState(false);
  const [rotation, setRotation] = useState(0);  // 랜던 회전 각도
  const [backgroundColor, setBackgroundColor] = useState(""); // 랜덤 배경색

  const backColor = [
    "rgba(215, 238, 137, 0.5)", // lightBlue (연한 연두)
    "rgba(187, 219, 180, 0.5)", // lightGreen (연한 초록)
    "rgba(255, 167, 160, 0.5)", // lightcoral (연한 분홍)
    "rgba(252, 240, 204, 0.5)", // lightyellow (연한 노랑)
    "rgba(166, 227, 255, 0.5)", // lightskyblue (연한 하늘색)
  ];


  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때만 랜덤 각도를 설정합니다.
    setRotation(Math.floor(Math.random() * 10) - 5);

     // 랜덤 배경색 설정
    const randomColor = backColor[Math.floor(Math.random() * backColor.length)];
    setBackgroundColor(randomColor);
  }, []); // 빈 의존성 배열이므로 최초 한 번만 실행됩니다.

 

  const showPaperDetailModal = () => {
    setIsPaperDetailModalOpen(true);
  };

  const closePaperDetailModal = () => {
    setIsPaperDetailModalOpen(false);
  };

  return (
    <>
      <div
        key={paperId}
        onClick={showPaperDetailModal}
        className="paper-box"
        style={{ 
          transform: `rotate(${rotation}deg)`,  // 고정된 랜덤 각도 적용
          backgroundColor: backgroundColor }}   // 고정된 랜덤 배경색 적용
      >
      
        <p className="fromName">{`From. ${authorRole === "TEACHER" ? ( "선생님" ) : ( authorName )}`}</p>
        <p className="roll-content">{content}</p>
      </div>

      {isPaperDetailModalOpen && (
        <PaperDetailModal
          closeModal={closePaperDetailModal}
          paper={paper} // 선택된 페이퍼 내용 전달
          role={role}
          currentStudentId={currentStudentId}
          onUpdatePaper={onUpdatePaper}
          onDeletePaper={onDeletePaper}
        />
      )}
    </>
  );
};

export default PaperItem;
