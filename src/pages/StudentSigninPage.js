import StudentSignin from "../components/StudentSignin";
import '../styles/common/Logo.css';

const StudentSigninPage = () => {
    
    // URL을 통해서 왔을 때 특정 학급에 접근할 수 있는 입장 페이지가 나올 수 있도록 해야한다.
    
    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\rollingPaperLogo.webp" className="logo" alt="Logo" />
            </div>
            <StudentSignin />
        </div>
        
    )
}

export default StudentSigninPage