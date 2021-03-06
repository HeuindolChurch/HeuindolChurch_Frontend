import React, {useState, useEffect, ChangeEvent} from "react";
import { ko } from 'date-fns/locale';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom";
import Background from "../components/Background";
import {
    Card,
    Typography,
    Button,
    Stack,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import {AccountAPI} from '../API';
import { AccountInfo } from '../types/type';
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
  font-size: smaller;
  text-align: left;
  color: #696969;
`;

const Name = styled.div`
  font-size: medium;
`;

const Content = styled.div`
  margin: 20px 5px 5px 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const BtnStack = styled(Stack)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AccountEditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as AccountInfo;

    const [loading, setLoading] = useState(true);

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
        price: state.price? state.price : 0,
        reason: state.reason? state.reason : '',
        note: state.note? state.note: '',
        insert: false,
        date: state.date? state.date: new Date(new Date().toISOString().split('T')[0]),
    });

    useEffect(() => {
        if (loading) {
            setAccount({...account, ...state});
            setLoading(false);
        }
    }, [account]);

    const onClick = () => {
        if (account.price === 0 || account.reason.length === 0) alert('????????? ???????????????.');
        else {
            AccountAPI.createAccount(account, accessToken).then(res => {
                navigate(`/account`);
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
                    <b>???????????? ????????? ????????????</b>
                </Typography>
                <hr/>
                <Content>
                    <Text>??????</Text>
                    <TextField id="standard-basic" variant="standard" name="reason" onChange={onChange} value={account.reason}/>
                    <Text>??????/??????</Text>
                    <TextField id="standard-basic" variant="standard" name="price" onChange={onChange} value={account.price}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ko}>
                        <DatePicker
                            label='??????'
                            onChange={(date) => {
                                date && setAccount({...account, date});
                            }}
                            value={account.date}
                            renderInput={(params) => <TextField variant="standard" {...params} />}
                        />
                    </LocalizationProvider>
                    <Text>??????</Text>
                    <TextField id="standard-basic" variant="standard" name="note" onChange={onChange} value={account.note}/>
                    <BtnStack>
                        <Button onClick={() => onClick()} variant='contained'>??????</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
};

export default AccountEditPage;