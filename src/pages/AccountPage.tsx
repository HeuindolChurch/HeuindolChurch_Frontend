import React, {useState, useEffect, useRef} from "react";
import {useParams} from 'react-router-dom';
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
import {AccountAPI} from '../API';
import styled from 'styled-components';
import {useNavigate, useSearchParams} from "react-router-dom";
import moment from "moment";

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
    const mountedRef = useRef(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [date, setDate] = useState(
        moment().startOf('month').add(1, 'day')
    );

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
        console.log(date);
        const fetch = async () => {
            const info = await AccountAPI.getAllMonthAccountInfo(accessToken);
            if (info.length === 0) {
                mountedRef.current = false;
                navigate('/init');
            } else {
                const bal = await AccountAPI.getMonthAccountInfo({
                    date: date.toISOString(true).split('T')[0]
                }, accessToken);

                const rows = await AccountAPI.getAccountInfo(date.toISOString().split('T')[0]!, accessToken);
                if (bal !== null) {
                    let temp = bal.balance;

                    rows.map((elem: Record<string, any>) => {
                        temp += elem['price'];
                        elem['balance'] = temp;
                        return elem;
                    });
                }

                setRows(rows);
            }
        }

        if (accessToken) fetch();
    }, [accessToken, date]);

    return (
        <Background>
            <Main>
                <Typography gutterBottom variant='h5' component='div' align='center'>
                    <b>흰돌교회 청년부 회계관리</b>
                </Typography>
                <hr/>
                <Content>
                    <h3>{`${date.year()}년 ${date.month() + 1}월`}</h3>
                    <Name>{name}님, 환영합니다.</Name>
                    {
                        level > 2
                        && <BtnStack direction='row' spacing={2}>
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
                                        <TableRow
                                            key={row.id}
                                            onClick={() => {
                                                console.log(row);
                                                if (level > 2) {
                                                    navigate('/account/add', { state: row })
                                                }
                                            }}
                                        >
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
                    <BtnStack direction='row' spacing={1}>
                        <Button variant='outlined' onClick={() => {
                            setDate(moment(date)
                                .startOf('month')
                                .subtract(1, 'month')
                                .add(1, 'day')
                            );
                        }}>이전 달</Button>
                        <Button variant='contained' onClick={() => {
                            setDate(moment(date)
                                .endOf('month')
                                .add(1, 'day')
                            );
                        }}>다음 달</Button>
                    </BtnStack>
                </Content>
            </Main>
        </Background>
    )
};

export default AccountPage;