import React, {useState, useEffect, ChangeEvent} from "react";
import { ko } from 'date-fns/locale';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Background from "../components/Background";
import {
    Card,
    Typography,
    Button,
    Stack,
    TextField
} from '@mui/material';
import { InitAPI } from '../API';
import styled from 'styled-components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    LocalizationProvider,
    DatePicker
} from '@mui/lab';


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

const Name = styled.div`
  font-size: medium;
`;

const Content = styled.div`
  margin: 20px 5px 5px 5px;
  //text-align: center;
  display: flex;
  flex-direction: column;
`;

const BtnStack = styled(Stack)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AccountInit = () => {
    const navigate = useNavigate();

    const {
        accessToken,
        name,
        level
    } = useSelector((state: { userInfo: { accessToken: string, name: string, level: number } }) => ({
        accessToken: state.userInfo.accessToken,
        name: state.userInfo.name,
        level: state.userInfo.level
    }));

    const [account, setAccount] = useState({
        balance: 0,
        date: new Date(new Date().toISOString().split('T')[0]),
    });

    const onClick = () => {
        if (account.balance === 0) alert('양식을 채워주세요.');
        else {
            InitAPI.initAccount(account, accessToken).then(res => {
                navigate(`/account?date=${account.date.toISOString().split('T')[0]}`);
            });
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }

    return (
        <Background>
            <Main>
                <Typography gutterBottom variant='h5' component='div' align='center'>
                    <b>흰돌교회 청년부 회계관리</b>
                </Typography>
                <hr/>
                <Content>
                    <Text>
                        청년부 회계관리 페이지에 오신 것을 환영합니다.<br/>
                        청년부 회계관리 처음 사용시 회계 관리를 시작할 달의 초기 잔액을 설정해야 합니다. 이번 달 1일에 가지고 있었던
                        금액을 작성 해 주세요.<br/>
                        입력 할 때 날짜는 관리 시작 달의 아무 날짜나 입력해도 됩니다.
                    </Text>
                    <TextField id="standard-basic" label="수입/지출" variant="standard" name="balance" onChange={onChange}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                        <DatePicker
                            label='날짜'
                            onChange={(date) => {
                                date && setAccount({...account, date});
                            }}
                            value={account.date}
                            renderInput={(params) => <TextField variant="standard" {...params} />}
                        />
                    </LocalizationProvider>
                    <BtnStack>
                        <Button onClick={() => onClick()} variant='contained'>입력</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
};

export default AccountInit;