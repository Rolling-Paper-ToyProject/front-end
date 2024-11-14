import { useState } from "react"
import '../styles/components/StudentSignin.css' 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignin = ({ url }) => {
    const navigate = useNavigate();
    const [pinNumber, setPinNumber] = useState('');
    const [classCode, setClassCode] = useState('');
    const [studentName, setStudentName] = useState('');

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/roll/${url}/join`, 
                {
                    "name": studentName,
                    "classCode": classCode,
                    "pinNumber": pinNumber
                }
            );

            if(!response === 200) {
                throw new Error("응답을 불러올 수 없습니다.")
            }

            const studentData = response.data;
            const token = studentData.data.accessToken;
            const refreshToken = studentData.data.refreshToken;
            const rollId = studentData.data.rollId;
            const rollName = studentData.data.rollName;
            const studentPapers = studentData.data.papers

            if (token && refreshToken) {
                localStorage.setItem("Authorization", `Bearer ${token}`);
                localStorage.setItem("RefreshToken", refreshToken);
                navigate(`/roll/${url}/join`, { state: { rollId, rollName, studentPapers }})
            }

        } catch (error) {
            console.log("토큰 fetch 실패: ", error);
            alert("사용자 정보를 불러올 수 없습니다.");
        }
            // const token = await joinResponse.headers["authorization"]?.split(" ")[1];
            // const refreshToken = await joinResponse.headers["refreshtoken"];
            
            // localStorage.setItem("Authorization", `Bearer ${token}`);
            // localStorage.setItem("RefreshToken", refreshToken);

            // console.log("Token:", token);
            // console.log("Refresh Token:", refreshToken);

            // const joinData = await joinResponse.data;
            // if (joinData) {
            //     setRollId(joinData.data.rollId);
            //     setStudentName(joinData.data.name);
            // }
            // console.log ("입장 응답 데이터:", joinData);
            // navigate(`/roll/join/${url}`, { state: { rollId, studentName } });
    }

    return(
        <div>
            <form onSubmit={handleSignin}>
                <div>
                    <input 
                    type="text" 
                    placeholder="학급코드를 입력해주세요" 
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    required />
                </div>
                <div>
                    <input 
                    type="text" 
                    placeholder="이름을 입력해주세요" 
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required />
                </div>
                <div>
                    <input 
                    type="password" 
                    placeholder="비밀번호 4자리를 입력해주세요" 
                    value={pinNumber}
                    onChange={(e) => setPinNumber(e.target.value)}
                    required />
                </div>
                <button type="submit" className="signin-button">롤링페이퍼 입장</button>
            </form>
        </div>
    )
}

export default StudentSignin;