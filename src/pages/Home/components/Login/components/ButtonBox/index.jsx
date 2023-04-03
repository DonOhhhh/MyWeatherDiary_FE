import styled from "@emotion/styled";
import { redirect, useNavigate } from "react-router-dom";
import { StyledButton } from "../../../StyledFormik";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 10px;
    gap: 10px;
`;

export default function ButtonBox() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <StyledButton type="submit">Login</StyledButton>
            <StyledButton
                onClick={(e) => {
                    e.preventDefault();
                    navigate("/home/signup");
                }}
            >
                Sign Up
            </StyledButton>
        </Wrapper>
    );
}
