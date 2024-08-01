import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/theme';
import GlobalStyle from './styles/global-styles';
import Input from './components/Common/Input';
import Button from './components/Common/Button';
import Text from './components/Common/Text';
import LoginPage from './pages/LoginBefore/Login/LoginPage';
import BottomNav from './components/Common/BottomNav';

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
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <s.Background />
        <s.Container></s.Container>
      </ThemeProvider>
    </>
  );
}

export default App;
