import React from "react";
import Background from "../components/Background";
import { Card, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

const AccountPage = () => {
    return (
        <Background>
            <Main>
                <Typography gutterBottom variant='h5' component='div' align='center'>
                    <b>흰돌교회 청년부 회계관리</b>
                </Typography>
                <hr/>
                <Content>
                </Content>
            </Main>
        </Background>
    )
};

export default AccountPage;