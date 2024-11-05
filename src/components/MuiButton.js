import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

//배경색 없는 Button
export const CustomButton1 = styled(Button)(({ theme }) => ({
    color: '#2e8b57',
    '&:hover': {
        backgroundColor: 'lightgray',
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
