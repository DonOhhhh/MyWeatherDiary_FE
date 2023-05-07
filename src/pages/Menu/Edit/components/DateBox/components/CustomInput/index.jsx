import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: fit-content;
    height: fit-content;
    border: 0;
    border-radius: 20px;
    padding: 5px 10px;
    text-align: center;
    font-size: 18px;
    &:hover {
        cursor: pointer;
        background-color: #ddd;
    }
`;

function CustomInput({ value, onClick }) {
    const activityState = useSelector((state) => state.activity);

    return (
        <Container>
            {activityState.loading ? (
                <Spinner size={30} />
            ) : (
                <Wrapper onClick={onClick}>
                    {value || "날짜를 선택해주세요"}
                </Wrapper>
            )}
        </Container>
    );
}

export default CustomInput;
