import styled from "@emotion/styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormError from "../../../../common/components/FormError";
import {
    StyledForm,
    StyledField,
    StyledButton,
    StyledLabel,
} from "../StyledFormik";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from "../../reducer/signupSlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TitleBox = styled.div`
    margin: 0;
    width: 100%;
    /* height: fit-content; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-family: "Jua";
    font-size: 100px;
    font-weight: "400";
    color: white;
`;

export default function SignUp() {
    const navigate = useNavigate();
    const initialValues = useSelector((state) => state.signup);
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        // 이메일 중복 검사
        // 200 : 비중복, 401 : 중복
        // 중복일 시 alert창으로 email이 중복이라고 알려줌.
        // 비중복일 시 key 발급창으로 이동
        dispatch(getKey(values));
        navigate("/home/key");
    };
    const validationSchema = Yup.object({
        email: Yup.string().email().required("Email required"),
        diaryTitle: Yup.string().required("Diary Title required"),
    });
    return (
        <Wrapper>
            <TitleBox>
                <Title>회원가입</Title>
            </TitleBox>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <StyledForm>
                    <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledField name="email" placeholder="Email" />
                    <ErrorMessage name="email">
                        {(msg) => <FormError errorMessage={msg} />}
                    </ErrorMessage>
                    <StyledLabel htmlFor="diaryTitle">
                        다이어리 이름
                    </StyledLabel>
                    <StyledField
                        type="text"
                        name="diaryTitle"
                        placeholder="Diary Title"
                    />
                    <ErrorMessage name="diaryTitle">
                        {(msg) => <FormError errorMessage={msg} />}
                    </ErrorMessage>
                    <br />
                    <StyledButton type="submit">가입</StyledButton>
                </StyledForm>
            </Formik>
        </Wrapper>
    );
}
