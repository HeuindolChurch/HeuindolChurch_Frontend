import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Typography, TextField, Button, Stack} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { userAPI } from '../API';
import * as AuthModule from '../modules/UserInfo';
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
    const dispatch = useDispatch();
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const Login = (accessToken: string, refreshToken: string, name: string, level: number) => {
        dispatch(AuthModule.login(accessToken, refreshToken, name, level));
    }

    const onLoginClick = (e: React.MouseEvent<HTMLElement>) => {
        userAPI.getToken(info.username, info.password).then(res => {
            Login(res['access-token'], res['refresh-token'], res['name'], res['level']);
            navigate(`/account?date=${new Date().toISOString().split('T')[0]}`);
        });
    }

    return (
        <Background>
            <Main>
                <Content>
                    <Typography variant='h5' component='div'><b>로그인</b></Typography>
                    <TextField name='username' label='아이디' onChange={onChange} variant='standard'/>
                    <TextField name='password' label='비밀번호' onChange={onChange} variant='standard' type='password'/>
                    <BtnStack spacing={2} direction="row">
                        <Button variant='contained' onClick={() => navigate('/auth')}>회원가입</Button>
                        <Button variant='outlined' onClick={onLoginClick}>로그인</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
}

export default LoginPage;