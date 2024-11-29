import { useEffect, useState } from "react";
import "../styles/components/StudentSignin.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../config";

const StudentSignin = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation(); // location 훅 사용
  const { state } = location; // navigate로 전달된 state 가져오기
  const role = state?.role; // state에서 role 값을 가져오기 (없으면 undefined)

  // 상태 관리
  const [formData, setFormData] = useState({
    classCode: "",
    studentName: "",
    pinNumber: "",
  }); // 모든 입력값을 하나의 상태로 관리

  const token = localStorage.getItem("Authorization");
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계: 1=학급코드, 2=이름, 3=비밀번호, 4=버튼

  useEffect(() => {
    if (role !== "TEACHER") return;
    const fetchTeacherData = async () => {
      if (token) {
        try {
          const teacherUserResponse = await axios.get(
              API.TEACHER_PROFILE,
              { headers: { Authorization: token } }
          )

          const teacherUserData = teacherUserResponse.data;
          console.log(teacherUserData)
          if (!teacherUserData || !teacherUserData.data) {
            console.error("올바르지 않은 선생님 사용자 응답입니다.")
            return;
          }

          const role = teacherUserData.data.role;
          console.log(role)
          if (role !== "TEACHER") {
            console.warn("선생님이 아닌 사용자입니다.")
            return;
          }

          const teacherRollResponse = await axios.get(
              API.GET_ROLL,
              {
                headers: {
                  Authorization: token,
                }
              }
          );
          const teacherRollData = teacherRollResponse.data;
          const foundItem = teacherRollData.data.find((item) => item.url === url);

          if (foundItem) {
            const { rollId, rollName } = foundItem;
            navigate(`/roll/${url}/join`, { state: { rollId, rollName, role : "TEACHER" } });
          } else { return; }
        } catch (error) {}
      }
    };

    fetchTeacherData();
  }, [token, url]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // 입력 필드의 name과 value를 가져옴
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // 해당 name에 따라 상태 업데이트
      ...(name === "classCode" && { studentName: "", pinNumber: "" }), // 학급코드 수정 시 이름과 비밀번호 초기화
      ...(name === "studentName" && { pinNumber: "" }), // 이름 수정 시 비밀번호 초기화
    }));

    // 단계별 로직
    if (name === "classCode" && value.trim()) {
      setCurrentStep(2); // 학급코드 입력 시 이름 입력란 표시
    } else if (name === "classCode" && !value.trim()) {
      setCurrentStep(1); // 학급코드가 비워지면 초기 상태로 복귀
    }

    if (name === "studentName" && value.trim()) {
      setCurrentStep(3); // 이름 입력 시 비밀번호 입력란 표시
    } else if (name === "studentName" && !value.trim()) {
      setCurrentStep(2); // 이름이 비워지면 학급코드까지만 표시
    }

    if (name === "pinNumber" && value.trim()) {
      setCurrentStep(4); // 비밀번호 입력 시 버튼 표시
    } else if (name === "pinNumber" && !value.trim()) {
      setCurrentStep(3); // 비밀번호가 비워지면 이름 입력란까지만 표시
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      // 입력값 검증
      if (formData.classCode !== formData.classCode.trim()) {
        alert("입력한 학급코드 앞과 뒤의 여백을 없애주세요");
        return;
      }

      if (formData.studentName !== formData.studentName.trim()) {
        alert("입력한 이름 앞과 뒤의 여백을 없애주세요");
        return;
      }

      if (/^[가-힣a-zA-Z]*$/.test(formData.pinNumber) || !/^[0-9]*$/.test(formData.pinNumber)) {
        alert('숫자만 입력 가능합니다.');
        return;
      }
    
      const response = await axios.post(
        API.STUDENT_JOIN_URL(url),
        {
          name: formData.studentName,
          classCode: formData.classCode,
          pinNumber: formData.pinNumber,
        }
      );

      if (!response === 200) {
        throw new Error("응답을 불러올 수 없습니다.");
        // return; 필요하지 않음. Error로 인해 함수 실행이 중단됨.
      }

      const { 
        accessToken: studentToken,
        refreshToken,
        rollId,
        rollName,
        role,
        studentId: currentStudentId
      } = response.data.data;

      if (studentToken && refreshToken) {
        localStorage.setItem("Authorization", `Bearer ${studentToken}`);
        localStorage.setItem("RefreshToken", refreshToken);
        navigate(`/roll/${url}/join`, { state: { rollId, rollName, role, currentStudentId } });
      }
    } catch (error) {
      console.log("토큰 fetch 실패: ", error);
      alert("입력한 학급코드를 확인해주세요");
    }
  };

  return (
    <div className="student-container">
      <form onSubmit={handleSignin} className="student-login-area">
        {/* 학급코드 입력란 */}
        <div className={`input-field ${currentStep >= 1 ? "show" : ""}`}>
          <label>학급코드</label>
          <input
            type="text"
            name="classCode"
            value={formData.classCode}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 이름 입력란 */}
        <div className={`input-field ${currentStep >= 2 ? "show" : ""}`}>
          <label style={{ letterSpacing: "16px" }}>이름</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* 비밀번호 입력란 */}
        <div className={`input-field ${currentStep >= 3 ? "show" : ""}`}>
          <label>비밀번호</label>
          <input
            type="password"
            name="pinNumber"
            value={formData.pinNumber}
            onChange={handleInputChange}
            maxLength={"4"}
            placeholder="숫자 4자리"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <div className={`input-field ${currentStep === 4 ? "show" : ""}`}>
          <button type="submit" className="signin-button">
            롤링페이퍼 입장
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentSignin;
