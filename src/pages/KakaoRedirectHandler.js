import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 실행되는 코드 (카카오 인증 후 리다이렉트된 후 동작)

        // 현재 URL에서 인증 코드 추출
        const url = new URL (window.location.href); // 현재 브라우저의 URL을 가져와 URL 객체로 변환
        const authCode = url.searchParams.get('code'); // URL의 쿼리 파라미터 중 'code' 값(카카오 인증 코드)을 가져옴

        if (authCode) { // 인증 코드가 존재할 경우 실행
            // 인증 코드를 백엔드로 전송하여 로그인 처리 요청
            fetch(`http://localhost:8080/login/oauth2/code/kakao?code=${authCode}`) // 인증 코드를 포함한 요청을 백엔드로 보냄
                .then(response => response.json()) // 백엔드에서 반환된 응답을 JSON 형태로 변환
                .then(data => {
                    const userId = data.userId; // 백엔드로부터 받은 사용자 ID를 변수에 저장
                    navigate(`/mypage/${userId}`); // 사용자 ID를 사용하여 MyPage로 리다이렉트
                })
                .catch(error => {
                    console.error("로그인 처리 중 오류 발생", error); // 로그인 처리 중 오류가 발생할 경우 콘솔에 출력
                    alert("로그인 실패"); // 로그인 실패 시 사용자에게 경고 메시지를 출력
                });
        }
    }, {navigate}); // 의존성 배열에 navigate를 넣어 navigate가 변경될 때만 useEffect를 재실행

    return <div>카카오 로그인 처리 중입니다...</div>; // 인증 처리 중일 떄 화면에 "로그인 처리 중입니다..."라는 메시지를 출력
}

export default KakaoRedirectHandler;