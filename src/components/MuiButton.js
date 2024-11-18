import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

//소셜 로그인 버튼
export const CustomButton1 = styled(Button)(({ theme }) => ({
    position: 'relative', // ::before 가상 요소가 버튼 내부에 위치하도록 설정
    overflow: 'hidden', // 버튼 외부로 벗어나는 요소를 숨김
    borderRadius: '50%',
    padding: 0, // 버튼의 padding 제거
    border: 'none', // 불필요한 border가 없도록 설정
    width: '65px', // 버튼의 가로 크기
    height: '65px', // 버튼의 세로 크기 (가로와 동일하게 설정)
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(245, 245, 245, 0)', // 초기에는 투명
        transition: 'background-color 0.3s ease', // 부드러운 전환 효과
        zIndex: 1,
    },
    '&:hover::before': {
        backgroundColor: 'rgba(245, 245, 245, 0.7)', // 호버 시 내부에 투명한 회색 오버레이 적용
        borderRadius: '50%',
    },
    '&:hover': {
        backgroundColor: 'rgba(245, 245, 245, 0)', // 기본 파란색 호버 스타일 덮어쓰기ㄴ
        borderRadius: '50%',
    },
}));

export const CustomButton2 = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize:'bold',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

// 로그아웃 버튼
export const CustomLogout = styled(Button)(({ theme }) => ({
    color: '#000000',
    '&:hover': {
        backgroundColor:'#ffffff',
        color: 'lightgray',
        fontWeight: 'bold',
    },
}));
