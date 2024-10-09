import { useState } from "react"
import SocialLogin from '../components/SocialLogin'
import '../styles/pages/LoginPage.css';
import '../styles/common/Logo.css';

const LoginPage = () => {
    return (
        <div className="container">  
            <div className="logo-container"> {/* logo-container 추가 */}
                <img src="\images\\logo\rolling-paper-logo.webp" className="logo" alt="Logo" />
            </div>
            <SocialLogin />
        </div>
    );
};

export default LoginPage;