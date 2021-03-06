import React, {ChangeEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, TextField, Button, Stack } from '@mui/material';
import styled from 'styled-components';
import Background from "../components/Background";

import { userAPI } from '../API';

const Main = styled(Card)`
  position: absolute;
  display: flex;
  max-height: 400px;
  max-width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 40%;
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
    const [info, setInfo] = useState({
        email: '',
        password: '',
        name: '',
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const signUp = () => {
        userAPI.createUser(info.email, info.password, info.name).then(res => {
            alert('준회원 가입이 완료되었습니다. 승급은 총무에게 문의하세요.');
            navigate('/login');
        }).catch(err => {
            alert('회원 가입 중 오류가 발생하였습니다.');
        });
    }


    return (
        <Background>
            <Main>
                <Content>
                    <Typography variant='h5' component='div'><b>회원가입</b></Typography>
                    <TextField name="email" label="이메일" variant="standard" type='email' onChange={onChange} />
                    <TextField name="password" label="비밀번호" variant="standard" type='password' onChange={onChange} />
                    <TextField name="name" label="이름" variant="standard" onChange={onChange} />
                    <BtnStack>
                        <Button
                            variant='contained'
                            onClick={signUp}>
                            회원가입
                        </Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
}

export default LoginPage;