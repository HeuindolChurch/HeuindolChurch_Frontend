import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import Background from "../components/Background";
import {
    Card,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stack
} from '@mui/material';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {AccountAPI} from '../API';
import styled from 'styled-components';
import {Account} from '../types/type';
import {useNavigate} from "react-router-dom";

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
`;

const BtnStack = styled(Stack)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const AccountPage = () => {
    const [rows, setRows] = useState<{ [key: string]: any; }[]>();
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

    useEffect(() => {
        accessToken && AccountAPI.getAccountInfo(accessToken).then(res => {
            console.log(res);
            setRows(res);
        });
    }, [accessToken]);

    return (
        <Background>
            <Main>
                <Typography gutterBottom variant='h5' component='div' align='center'>
                    <b>흰돌교회 청년부 회계관리</b>
                </Typography>
                <hr/>
                <Content>
                    <Name>{name}님, 환영합니다.</Name>
                    {
                        level > 2
                        && <BtnStack direction='row' spacing={2} >
                            <Button variant='contained' onClick={() => navigate('/account/add')}>추가</Button>
                            <Button variant='outlined'>수정</Button>
                        </BtnStack>
                    }
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 600}} aria-label="account table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>날짜</TableCell>
                                    <TableCell>적요</TableCell>
                                    <TableCell>지출</TableCell>
                                    <TableCell>수입</TableCell>
                                    <TableCell>잔액</TableCell>
                                    <TableCell>비고</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows !== undefined
                                    && rows.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell component='th' scope='row'>
                                                {row.date}
                                            </TableCell>
                                            <TableCell>{row.reason}</TableCell>
                                            <TableCell>{row.price < 0 && row.price}</TableCell>
                                            <TableCell>{row.price > 0 && row.price}</TableCell>
                                            <TableCell>{row.balance}</TableCell>
                                            <TableCell>{row.note}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <BtnStack direction='row' spacing={1} >
                        <Button variant='outlined'>이전 달</Button>
                        <Button variant='contained'>다음 달</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
};

export default AccountPage;