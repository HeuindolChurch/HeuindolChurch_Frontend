import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Typography, TextField, Button, Stack} from '@mui/material';
import styled from 'styled-components';
import Background from "../components/Background";

const Main = styled(Card)`
  position: absolute;
  display: flex;
  max-height: 300px;
  min-height: 250px;
  max-width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 30%;
  padding: 7% 7% 10% 7%;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BtnStack = styled(Stack)`
  padding-top: 20px;  
`;

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <Background>
            <Main>
                <Content>
                    <Typography variant='h5' component='div'><b>로그인</b></Typography>
                    <TextField id='standard-basic' label='아이디' variant='standard'/>
                    <TextField id='standard-basic' label='비밀번호' variant='standard' type='password'/>
                    <BtnStack spacing={2} direction="row">
                        <Button variant='contained' onClick={() => navigate('/auth')}>회원가입</Button>
                        <Button variant='outlined'>로그인</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
}

export default LoginPage;