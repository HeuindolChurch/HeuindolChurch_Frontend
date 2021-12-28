import React from "react";
import { useNavigate } from 'react-router-dom';
import Background from "../components/Background";
import { Card, Typography, Button } from '@mui/material';
import styled from 'styled-components';

const Main = styled(Card)`
  position: absolute;
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  transform: translate(20px, 20px); 
  padding: 20px;
`;

const Text = styled.div`
  font-size: small;  
`;

const Content = styled.div`
  margin: 20px 5px 5px 5px;  
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Background>
            <Main>
                <Typography gutterBottom variant='h5' component='div' align='center'>
                    <b>흰돌교회 청년부 회계관리</b>
                </Typography>
                <hr/>
                <Content>
                    <Text>
                        흰돌교회 청년부 회계관리 페이지에 오신 것을 환영합니다.<br/><br/>
                        회계 현황 혹은 작성을 위해서는 로그인이 필요합니다.
                        만약 흰돌교회 청년부에 소속되어 있다면, 청년부 총무에게 연락 해 주세요.
                    </Text>
                    <BtnWrap>
                        <Button
                            style={{justifyContent: 'center'}}
                            variant="contained"
                            onClick={() => navigate('/login')}
                        >회원가입/로그인 하러가기</Button>
                    </BtnWrap>
                </Content>
            </Main>
        </Background>
    )
};

export default MainPage;