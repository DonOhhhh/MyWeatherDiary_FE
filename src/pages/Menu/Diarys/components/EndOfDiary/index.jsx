import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: transparent;
    vertical-align: middle;
    position: relative;
    display: flex;
    align-items: center;
`;

const AlignedDivider = styled.hr`
    width: 100%;
    border: 2px dashed black;
`;

const AlignedText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    font-size: 24px;
    padding: 0 10px;
`;

function EndOfDiary() {
    return (
        <Container>
            <AlignedDivider />
            <AlignedText>End Of Diary</AlignedText>
        </Container>
    );
}

export default React.memo(EndOfDiary);
