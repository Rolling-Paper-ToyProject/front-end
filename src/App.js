import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/common/App.css';
import LoginPage from './pages/LoginPage';
import StudentSigninPage from './pages/StudentSigninPage';
import MyPage from './pages/MyPage';
import RollingPaperPage from './pages/RollingPaperPage';
import RedirectHandler from './pages/RedirectHandler';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './components/MuiColor';
import { Provider } from 'react-redux';
// import store from './store.js'

function App() {
  return (
  <ThemeProvider theme={theme}>
    <div className="app-container">
      {/* <Provider store={store}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/oauth/callback" element={<RedirectHandler />} />
            <Route path="/:url" element={<StudentSigninPage />} />
            <Route path="/roll/:url/join/" element={<RollingPaperPage />} />
          </Routes>
        </BrowserRouter>
      {/* </Provider> */}
    </div>
  </ThemeProvider>
  );
}

export default App;