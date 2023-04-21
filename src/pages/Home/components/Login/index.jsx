import styled from "@emotion/styled";
import { ReactComponent as Logo } from "./icons/logo_reversed.svg";
import { Formik } from "formik";
import InputBox from "./components/InputBox";
import ButtonBox from "./components/ButtonBox";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { StyledForm } from "../StyledFormik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GenerateKeyModal from "./components/GenerateKeyModal";
import { loginReq } from "../../reducer/loginSlice";
import Spinner from "../../../../common/components/Spinner";

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
    const initialState = useSelector((state) => state.login);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const onSubmit = async (values) => {
        navigate("/main/diarys");
        // setIsSubmitted(true);
        // dispatch(loginReq(values.enterKey));
    };
    const validationSchema = Yup.object({
        enterKey: Yup.string().required("Password required"),
    });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (isSubmitted && !initialState.loading) {
            if (initialState.token) {
                sessionStorage.setItem("token", initialState.token);
                navigate("/main/diarys");
            } else {
                alert("인증키가 존재하지 않습니다.");
            }
            setIsSubmitted(false);
        }
    }, [isSubmitted, initialState]);
    return (
        <Formik
            initialValues={initialState}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <StyledForm>
                <LogoBox>
                    <LoginLogo />
                </LogoBox>
                <InputBox />
                {initialState.loading && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spinner />
                    </div>
                )}
                <ButtonBox onGenerateKeyClick={setOpen} />
                <GenerateKeyModal open={open} setOpen={setOpen} />
            </StyledForm>
        </Formik>
    );
}
