import { Component } from "lucide-react";
import { useState } from "react"
import '../styles/components/StudentSignin.css' 

const StudentSignin = () => {
    const [className, setClassName] = useState('');
    const [classCode, setClassCode] = useState('');
    const [name, setName] = useState('');
    
    const handleSignin = (e) => {
        e.preventDefault();
        // URL로 해당 링크로 입장한 후에 className에 할당된 classCode를 입력해야 들어갈 수 있도록 해야 함
        // 롤링페이퍼 참여 버튼 눌렀을 때 /pages/RollingPaperDetail로 이동해야 함
    }

    return(
        <div>
            <input 
                className="className-input"
                type="text" 
                value={className}
                disabled            
            />

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                </div>
                <button type="submit" className="signin-button">롤링페이퍼 참여</button>
            </form>
        </div>
    )
}

export default StudentSignin;