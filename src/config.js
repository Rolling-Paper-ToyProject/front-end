export const BASE_URL = "http://localhost:8080";

export const API = {

    // 로그인 관련
    TEACHER_PROFILE: `${BASE_URL}/user/profile`,
    STUDENT_JOIN_URL: (url) => `${BASE_URL}/roll/${url}/join`,
    
    // 롤 관련 (마이페이지)
    GET_ROLL: `${BASE_URL}/roll/me`,
    CREATE_ROLL: `${BASE_URL}/roll`,
    UPDATE_ROLL: (rollId) => `${BASE_URL}/roll/${rollId}`,
    DELETE_ROLL: (rollId) => `${BASE_URL}/roll/${rollId}`,

    // 페이퍼 관련
    GET_PAPER: (rollId) => `${BASE_URL}/paper/rolls/${rollId}`,
    CREATE_PAPER: (rollId) => `${BASE_URL}/paper/rolls/${rollId}`,
    UPDATE_PAPER: (paperId) => `${BASE_URL}/paper/${paperId}`,
    DELETE_PAPER: (paperId) => `${BASE_URL}/paper/${paperId}`,

};