import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import GlobalStyle from './styles/global-styles';
import Input from './components/Common/Input';
import Button from './components/Common/Button';
import Text from './components/Common/Text';
import LoginPage from './pages/LoginBefore/Login/LoginPage';
import BottomNav from './components/Common/BottomNav';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from './pages/IsLoginPage';
import SignUpPage from './pages/LoginBefore/SignUp/SignUpPage';
import SplashPage from './pages/SplashPage';
import PlusInfoPage from './pages/LoginAfter/PlusInfo/PlusInfoPage';
import FindEmailPage from './pages/LoginBefore/FindEmail/FindEmailPage';
import FindPasswordPage from './pages/LoginBefore/FindPassword/FindPasswordPage';
import FindEmailResultPage from './pages/LoginBefore/FindEmail/FindEmailResultPage';
import ChangePasswordPage from './pages/LoginAfter/ChangePassword/ChangePasswordPage';
import ResetPasswordPage from './pages/LoginBefore/ResetPassword/ResetPasswordPage';
import MainPage from './pages/Main/MainPage';
import AIMainPage from './pages/AI/AIMainPage';
import FitnessListPage from './pages/Fitness/FitnessListPage';
import FitnessDetailPage from './pages/Fitness/FitnessDetailPage';
import FitnessPlanSetPage from './pages/Fitness/FitnessPlanSetPage';
import FitnessRoutineDetatilPage from './pages/Fitness/FitnessRoutineDetailPage';
import FitnessRoutineListPage from './pages/Fitness/FitnessRoutineListPage';
import FitnessPlayPage from './pages/Fitness/FitnessPlayPage';
import FitnessFinishPage from './pages/Fitness/FitnessFinishPage';
import RecordMainPage from './pages/Record/RecordMainPage';
import RecordInBodyScanPage from './pages/Record/RecordInBodyScanPage';
import RecordInBodyScanResultPage from './pages/Record/RecordInBodyScanResultPage';
import RecordInBodyChartPage from './pages/Record/RecordInBodyChartPage';
import RecordFitnessChartPage from './pages/Record/RecordFitnessChartPage';
import ProfileMainPage from './pages/Profile/ProfileMain/ProfileMainPage';
import UpdateMyInfoPage from './pages/Profile/UpdateMyInfo/UpdateMyInfoPage';
import UpdateProfilePage from './pages/Profile/UpdateProfile/UpdateProfilePage';
import FitnessPage from './pages/Fitness/FitnessPage';
import RecordPage from './pages/Record/RecordPage';
import SocialPage from './pages/SocialPage/SocialPage';
import FeedPage from './pages/SocialPage/Feed/FeedPage';
import CreateFeedPage from './pages/SocialPage/Feed/CreateFeedPage';
import UserPostPage from './pages/SocialPage/Feed/UserPostPage';
import MarketPage from './pages/SocialPage/Market/MarketPage';
import UploadItemPage from './pages/SocialPage/Market/UploadItemPage';
import ChatListPage from './pages/SocialPage/Feed/ChatListPage';
import ChatPage from './pages/SocialPage/Feed/ChatPage';
import NotificationPage from './pages/SocialPage/Feed/NotificationPage';
import { useAppSelector } from './lib/hook/useReduxHook';
import { selectSnsType } from './store/page';

const s = {
  Background: styled.section`
    width: 100vw;
    height: 100%;
    background-color: #f1f3f5;
    position: absolute;
    font-size: 80px;
    line-height: 70px;
  `,
  Container: styled.div`
    max-width: 800px;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  test: styled.div`
    width: 100%;
    height: 100%;
    background-color: yellow;
    border: 1px solid red;
    display: flex;
  `,
};

function App() {
  const snsType = useAppSelector(selectSnsType);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <s.Background />
        <s.Container>
          <BrowserRouter>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup">
                  <Route index element={<SignUpPage />} />
                  <Route path="ok" element={<PlusInfoPage />} />
                </Route>
                <Route path="/find">
                  <Route path="email">
                    <Route path="" element={<FindEmailPage />} />
                    <Route path="" element={<FindEmailResultPage />} />
                  </Route>
                  <Route path="password">
                    <Route path="" element={<FindPasswordPage />} />
                    <Route path="" element={<ResetPasswordPage />} />
                  </Route>
                </Route>
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/main" element={<MainPage />} />
                {/* <Route path="/fitness">
                  <Route index element={<Navigate to="list" />} />
                  <Route path="list">
                    <Route index element={<FitnessListPage />} />
                    <Route path="detail" element={<FitnessDetailPage />} />
                  </Route>
                  <Route path="plan" element={<FitnessPlanSetPage />} />
                  <Route path="history">
                    <Route index element={<FitnessRoutineListPage />} />
                    <Route path="detail" element={<FitnessRoutineDetatilPage />} />
                  </Route>
                  <Route path="play">
                    <Route path="" element={<FitnessPlayPage />} />
                    <Route path="" element={<FitnessFinishPage />} />
                  </Route>
                </Route> */}
                {/* fitness */}
                <Route path="/fitness" element={<FitnessPage />}>
                  <Route index element={<Navigate to="list" replace />} />
                  <Route path="list">
                    <Route index element={<FitnessListPage />} />
                    <Route path="detail" element={<FitnessDetailPage />} />
                  </Route>
                  <Route path="plan" element={<FitnessPlanSetPage />} />
                  <Route path="history">
                    <Route index element={<FitnessRoutineListPage />} />
                    <Route path="detail" element={<FitnessRoutineDetatilPage />} />
                  </Route>
                </Route>
                <Route path="/play">
                  <Route path="" element={<FitnessPlayPage />} />
                  <Route path="" element={<FitnessFinishPage />} />
                </Route>
                {/* record */}
                {/* <Route path="/record">
                  <Route index element={<Navigate to={'main'} />} />
                  <Route path="main" element={<RecordMainPage />} />
                  <Route path="inbody">
                    <Route path="scan">
                      <Route path="" element={<RecordInBodyScanPage />} />
                      <Route path="" element={<RecordInBodyScanResultPage />} />
                    </Route>
                    <Route path="data" element={<RecordInBodyChartPage />} />
                  </Route>
                  <Route path="data" element={<RecordFitnessChartPage />} />
                </Route> */}
                <Route path="/record" element={<RecordPage />}>
                  <Route index element={<Navigate to={'main'} replace />} />
                  <Route path="main" element={<RecordMainPage />} />
                  <Route path="inbody">
                    <Route path="scan">
                      <Route path="" index element={<RecordInBodyScanPage />} />
                      <Route path="" element={<RecordInBodyScanResultPage />} />
                    </Route>
                    <Route path="data" element={<RecordInBodyChartPage />} />
                  </Route>
                  <Route path="data" element={<RecordFitnessChartPage />} />
                </Route>
                {/* ai */}
                <Route path="/ai" element={<AIMainPage />} />
                {/* sns */}
                <Route path="/sns" element={<SocialPage />}>
                  <Route index element={<Navigate to={'feed'} replace />} />
                  <Route path="feed">
                    <Route index element={<FeedPage />} />
                    <Route path="write" element={<CreateFeedPage />} />
                  </Route>
                  <Route path="profile">
                    <Route index element={<Navigate to={'id'} replace />} />
                    <Route path=":id" element={<UserPostPage />} />
                  </Route>
                  <Route path="market">
                    <Route index element={<MarketPage />} />
                    <Route path="write" element={<UploadItemPage />} />
                  </Route>
                  <Route path="chat">
                    <Route index element={<ChatListPage />} />
                    <Route path=":id" element={<ChatPage />} />
                  </Route>
                  <Route path="notification" element={<NotificationPage />} />
                </Route>
                {/* mypage */}
                <Route path="/mypage">
                  <Route path="" element={<ProfileMainPage />} />
                  <Route path="info" element={<UpdateMyInfoPage />} />
                  <Route path="profile" element={<UpdateProfilePage />} />
                  <Route path="password" element={<ChangePasswordPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </s.Container>
      </ThemeProvider>
    </>
  );
}

export default App;