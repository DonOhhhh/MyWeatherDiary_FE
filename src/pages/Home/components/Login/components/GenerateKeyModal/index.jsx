import styled from "@emotion/styled";
import {
    Box,
    Dialog,
    Fade,
    Modal,
    Popover,
    Snackbar,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { Copy, Send } from "react-feather";
import { StyledButton, StyledField, StyledForm } from "../../../StyledFormik";

const style = {
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "fit-content",
    bgcolor: "#c5e3ff",
    borderRadius: "20px",
    boxShadow: 24,
    p: 2,
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    gap: 10px;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 10px;
    padding: 5px;

    &:hover {
        background-color: #5d9dd8;
        cursor: pointer;
        & svg {
            stroke: white;
        }
    }
`;

export default function GenerateKeyModal({ open, setOpen }) {
    const [submitted, setSubmitted] = useState(false);
    const [copyOpen, setCopyOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const initialState = {
        diaryTitle: "",
        enterKey: "enterKey",
        email: "",
    };
    const handleSubmit = (values) => {
        if (!submitted && values.diaryTitle) setSubmitted(true);
        // 서버에 diaryTitle을 보내서 enterKey를 받아서 저장함.
    };
    const iconSize = 30;
    return (
        <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
            <Fade in={open}>
                <Box sx={style}>
                    <Formik
                        initialValues={initialState}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) =>
                            submitted ? (
                                <StyledForm
                                    style={{ width: "100%", gap: "20px" }}
                                >
                                    <InputContainer>
                                        <StyledField
                                            name="enterKey"
                                            disabled
                                            style={{
                                                textAlign: "center",
                                                color: "#aaa",
                                            }}
                                        />
                                        <IconContainer
                                            onClick={() => {
                                                window.navigator.clipboard.writeText(
                                                    values.enterKey
                                                );
                                                emailOpen &&
                                                    setEmailOpen(false);
                                                setCopyOpen(true);
                                            }}
                                        >
                                            <Copy size={iconSize} />
                                        </IconContainer>
                                        <Snackbar
                                            open={copyOpen}
                                            onClose={() => setCopyOpen(false)}
                                            autoHideDuration={1500}
                                            message="복사되었습니다."
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <StyledField
                                            name="email"
                                            placeholder="johndoe@email.com"
                                        />
                                        <IconContainer
                                            onClick={() => {
                                                copyOpen && setCopyOpen(false);
                                                setEmailOpen(true);
                                            }}
                                        >
                                            <Send size={iconSize} />
                                        </IconContainer>
                                        <Snackbar
                                            open={emailOpen}
                                            onClose={() => setEmailOpen(false)}
                                            autoHideDuration={1500}
                                            message="이메일로 전송되었습니다."
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                        />
                                    </InputContainer>
                                    <div
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            textAlign: "center",
                                        }}
                                    >
                                        key 분실 시 일기장을 찾을 수 없습니다.
                                    </div>
                                </StyledForm>
                            ) : (
                                <StyledForm
                                    style={{ width: "100%", gap: "20px" }}
                                >
                                    <StyledField
                                        name="diaryTitle"
                                        placeholder="일기 주제"
                                    />
                                    <StyledButton type="submit">
                                        키 생성
                                    </StyledButton>
                                </StyledForm>
                            )
                        }
                    </Formik>
                </Box>
            </Fade>
        </Modal>
    );
}
