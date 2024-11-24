export const BASE_URL = "https://sparklenote.site";

export const API = {
    // 로그인 관련
    TEACHER_PROFILE: `${BASE_URL}/api/user/profile`,
    STUDENT_JOIN_URL: (url) => `${BASE_URL}/api/roll/${url}/join`,

    // 롤 관련 (마이페이지)
    GET_ROLL: `${BASE_URL}/api/roll/me`,
    CREATE_ROLL: `${BASE_URL}/api/roll`,
    UPDATE_ROLL: (rollId) => `${BASE_URL}/api/roll/${rollId}`,
    DELETE_ROLL: (rollId) => `${BASE_URL}/api/roll/${rollId}`,

    // 페이퍼 관련
    GET_PAPER: (rollId) => `${BASE_URL}/api/paper/rolls/${rollId}`,
    CREATE_PAPER: (rollId) => `${BASE_URL}/api/paper/rolls/${rollId}`,
    UPDATE_PAPER: (paperId) => `${BASE_URL}/api/paper/${paperId}`,
    DELETE_PAPER: (paperId) => `${BASE_URL}/api/paper/${paperId}`,
};