import React from "react";
import styled from "styled-components";

const BaseElement = styled.div`
  background-color: lightblue;
  width: 100vw;
  height: 100vh;
`;


const Background = ({ children }: { children?: React.ReactNode }) => {
    return (
        <BaseElement>
            { children }
        </BaseElement>
    )
}

export default Background;