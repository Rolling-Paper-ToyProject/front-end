import { useEffect, useState } from "react";
import "../styles/components/StudentSignin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignin = ({ url }) => {
  const navigate = useNavigate();
  const [pinNumber, setPinNumber] = useState("");
  const [classCode, setClassCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (token) {
        try {
          const userResponse = await axios.get(
            "http://localhost:8080/roll/me",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const userData = userResponse.data;
          const foundItem = userData.data.find((item) => item.url === url);

          if (foundItem) {
            const { rollId, rollName } = foundItem;
            navigate(`/roll/${url}/join`, { state: { rollId, rollName } });
          }
        } catch (error) {}
      }
    };

    fetchTeacherData();
  }, [token, url, navigate]);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/roll/${url}/join`,
        {
          name: studentName,
          classCode: classCode,
          pinNumber: pinNumber,
        }
      );

      if (!response === 200) {
        throw new Error("응답을 불러올 수 없습니다.");
      }

      const studentData = response.data;
      const studentToken = studentData.data.accessToken;
      const refreshToken = studentData.data.refreshToken;
      const rollId = studentData.data.rollId;
      const rollName = studentData.data.rollName;

      if (studentToken && refreshToken) {
        localStorage.setItem("Authorization", `Bearer ${studentToken}`);
        localStorage.setItem("RefreshToken", refreshToken);
        navigate(`/roll/${url}/join`, { state: { rollId, rollName } });
      }
    } catch (error) {
      console.log("토큰 fetch 실패: ", error);
      alert("입력한 학급코드를 확인해주세요");
    }
  };

  return (
    <div className="student-container">
      <form onSubmit={handleSignin} className="student-login-area">
        <div>
          <label>학급코드 </label>
          <input
            type="text"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ letterSpacing: "10px" }}>이름 </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 </label>
          <input
            type="password"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
            maxLength={"4"}
            required
          />
        </div>
        <button type="submit" className="signin-button">
          롤링페이퍼 입장
        </button>
      </form>
    </div>
  );
};

export default StudentSignin;
