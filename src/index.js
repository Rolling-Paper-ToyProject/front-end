// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./app/store";
import axios from 'axios';  // axios import 추가

// axios 기본 설정 - 콘솔에 찍어서 확인
console.log('Setting axios defaults...');
axios.defaults.baseURL = 'https://sparklenote.site';
console.log('Axios baseURL:', axios.defaults.baseURL);

// 요청 인터셉터 추가 - 모든 요청의 URL을 로깅
axios.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();