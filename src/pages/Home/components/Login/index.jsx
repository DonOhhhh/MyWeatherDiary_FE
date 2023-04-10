import styled from "@emotion/styled";
import { ReactComponent as Logo } from "./icons/logo_reversed.svg";
import { Formik } from "formik";
import InputBox from "./components/InputBox";
import ButtonBox from "./components/ButtonBox";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { StyledForm } from "../StyledFormik";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Box, Dialog, DialogTitle, Fade, Modal } from "@mui/material";
import GenerateKeyModal from "./components/GenerateKeyModal";

const LogoBox = styled.div`
    margin: 0;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginLogo = styled(Logo)`
    margin: 0;
    width: 90%;
    height: 90%;
`;

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialState = {
        email: "",
        password: "",
    };
    const onSubmit = (values) => {
        console.log(values);
        navigate("/main/diarys");
    };
    const validationSchema = Yup.object({
        enterKey: Yup.string().required("Password required"),
    });

    const [open, setOpen] = useState(false);
    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ values }) => (
                <StyledForm>
                    <LogoBox>
                        <LoginLogo />
                    </LogoBox>
                    <InputBox />
                    <ButtonBox onGenerateKeyClick={setOpen} />
                    <GenerateKeyModal open={open} setOpen={setOpen} />
                </StyledForm>
            )}
        </Formik>
    );
}
