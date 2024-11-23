import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//선생님 마잎이지 버튼
function UrlCopyIcon(props) {
    return (
        <ContentPasteIcon {...props} style={{ cursor: 'pointer', fontSize:'30px' }} />
    );
}

function RollDelete(props) {
    return (
        <DeleteForeverIcon {...props} style={{ cursor: 'pointer', fontSize:'30px' }} />
    );
}

function RollTittleEdit(props) {
   return (
       <BorderColorIcon {...props} style={{ cursor: 'pointer', fontSize:'30px' }} />
   );
}

function UserLogout(props) {
  return (
      <LogoutIcon {...props} style={{ cursor: 'pointer', fontSize:'20px' }} />
  );
}

function BackToRollList(props) {
    return (
        <ArrowBackIosNewIcon {...props} style={{ cursor: 'pointer' }} />
    )
}

// 이름 내보내기
export { UrlCopyIcon, RollDelete, RollTittleEdit, UserLogout, BackToRollList };