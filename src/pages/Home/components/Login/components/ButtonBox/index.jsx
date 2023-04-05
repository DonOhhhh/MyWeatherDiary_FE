import styled from "@emotion/styled";
import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Box } from "react-feather";
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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ButtonBox({ onGenerateKeyClick }) {
    return (
        <Wrapper>
            <StyledButton type="submit">Login</StyledButton>
            <StyledButton
                onClick={(e) => {
                    e.preventDefault();
                    onGenerateKeyClick(true);
                }}
            >
                Generate Key
            </StyledButton>
        </Wrapper>
    );
}
