import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LogoutIcon from '@mui/icons-material/Logout';

//선생님 마잎이지 버튼
function UrlCopyIcon(props) {
    return (
        <ShareIcon {...props} style={{ cursor: 'pointer' }} sx={{ color: 'lightblue' }} />
    );
}

function RollDelete(props) {
    return (
        <DeleteIcon {...props} style={{ cursor: 'pointer' }} sx={{ color: 'lightpink' }} />
    );
}

function RollTittleEdit(props) {
   return (
       <BorderColorIcon {...props} style={{ cursor: 'pointer' }} sx={{ color: 'lightgreen' }} />
   );
}

function UserLogout(props) {
  return (
      <LogoutIcon {...props} style={{ cursor: 'pointer' }} />
  );
}

// 이름 내보내기
export { UrlCopyIcon, RollDelete, RollTittleEdit, LogoutIcon };