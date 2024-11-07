import { useState } from "react"
import '../styles/components/StudentSignin.css' 
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const StudentSignin = ({ token, url }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pinNumber, setPinNumber] = useState('');
    const [classCode, setClassCode] = useState('');
    const [studentName, setStudentName] = useState('');
    const [rollId, setRollId] = useState('');

    const handleSignin = async (e) => {
        e.preventDefault();
        console.log(url);
        try {
            const joinResponse = await axios.post(`http://localhost:8080/roll/${url}/join`, 
                {
                    "name": studentName,
                    "classCode": classCode,
                    "pinNumber": pinNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*'
                    }
                }
            )
            
            const token = await joinResponse.headers["authorization"]?.split(" ")[1];
            const refreshToken = await joinResponse.headers["refreshtoken"];
            
            localStorage.setItem("Authorization", `Bearer ${token}`);
            localStorage.setItem("RefreshToken", refreshToken);

            console.log("Token:", token);
            console.log("Refresh Token:", refreshToken);
            // const token = joinResponse.headers["authorization"];
            // if (token) {
            //     localStorage.setItem("Authorization", token);
            // }
            // console.log("JWT Token:", token);

            // const joinData = joinResponse.data;
            // if (joinData) {
            //     setRollId(joinData.data.rollId);
            //     setStudentName(joinData.data.name);
            // }
            // console.log ("입장 응답 데이터:", joinData);
            // navigate(`/roll/join/${url}`, { state: { rollId, studentName } });
        } catch (error) {
            console.log("롤링페이퍼 입장 실패:", error);
            alert("롤링페이퍼 입장 실패:", error);
        }
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