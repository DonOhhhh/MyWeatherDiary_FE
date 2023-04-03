import styled from "@emotion/styled";
import { ReactComponent as Logo } from "./icons/logo_reversed.svg";
import { Form, Formik } from "formik";
import InputBox from "./components/InputBox";
import ButtonBox from "./components/ButtonBox";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { StyledForm } from "../StyledFormik";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../Menu/Profile/reducer/profileSlice";

const LogoBox = styled.div`
    margin: 0;
    width: 100%;
    /* height: fit-content; */
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
        email: Yup.string().email().required("Email required"),
        password: Yup.string().required("Password required"),
    });
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
                    <ButtonBox />
                </StyledForm>
            )}
        </Formik>
    );
}
