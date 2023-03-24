import styled from "@emotion/styled";
import { Box, Dialog } from "@mui/material";
import React, { useRef } from "react";
import { Form, redirect } from "react-router-dom";
import CreateDiary from "./components/Modal";
import CustomButton from "./components/CustomButton";
import { ReactComponent as Logo } from "./icons/Login.svg";
import { useFormik } from "formik";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: #c5e3ff;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
`;

const Center = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
`;

const InputKey = styled.input`
    padding: 20px 30px;
    border: 5px solid #a1d2ff;
    border-radius: 40px;

    font-family: "Jua";
    font-weight: 400;
    font-size: 36px;
    color: #c5e3ff;

    caret-color: black;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #c5e3ff;
    }
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 10px;
    gap: 10px;
`;

const LoginLogo = styled(Logo)`
    margin: 0;
    width: 100%;
    height: fit-content;
`;

export async function action({ request }) {
    const formData = await request.formData();
    const form = Object.fromEntries(formData);
    return redirect("/main");
}

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const ref = useRef();
    return (
        <Container>
            <Center method="post">
                <LoginLogo />
                <InputKey
                    placeholder="Enter your key..."
                    name="enter_key"
                    required
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            ref.current.click();
                        }
                    }}
                />
                <ButtonBox>
                    <CustomButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                        }}
                    >
                        Generate Key
                    </CustomButton>
                    <CustomButton ref={ref}>Login</CustomButton>
                </ButtonBox>
            </Center>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{ sx: { borderRadius: "20px" } }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "fit-content",
                    }}
                >
                    <CreateDiary />
                </Box>
            </Dialog>
        </Container>
    );
}
