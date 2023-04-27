import styled from "@emotion/styled";
import { ErrorMessage, Form, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormError from "../../../common/components/FormError";
import { updateProfile, updateUser } from "../Profile/reducer/profileSlice";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35%;
    min-width: 400px;
    min-height: 100vh;
    height: 100%;
    gap: 10px;
`;

const StyledField = styled(Field)`
    width: 100%;
    font-size: 1rem;
    font-family: Jua;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
`;

const StyledButton = styled.button`
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
    &:hover {
        box-shadow: 0 0px 5px hsla(0, 0%, 0%, 0.2),
            0 5px 6px hsla(0, 0%, 0%, 0.2);
        /* background-color: #aaa; */
        cursor: pointer;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: fit-content;
    gap: 10px;
    margin: 20px 0;
`;

const StyledLabel = styled.label`
    width: 100%;
    text-align: start;
    font-size: 1rem;
    font-family: Jua;
    font-size: 24px;
    font-weight: 200;
    color: #747474;
`;

const RedStar = styled.span`
    color: red;
    font-weight: 100;
    font-size: 30px;
    margin-right: 5px;
`;

export default function ProfileEdit() {
    const initialValues = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(updateUser(values));
        navigate("/main/profile");
    };
    const validationSchema = Yup.object({
        nickName: Yup.string().required("Nickname is required"),
        diaryTitle: Yup.string().required("Diary Title is required"),
    });
    return (
        <Wrapper>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <StyledForm>
                    <StyledLabel htmlFor="nickName">
                        <RedStar>*</RedStar>Nickname
                    </StyledLabel>
                    <StyledField name="nickName" placeholder="nickName" />
                    <ErrorMessage name="nickName">
                        {(errMsg) => <FormError errorMessage={errMsg} />}
                    </ErrorMessage>

                    <StyledLabel htmlFor="diaryTitle">
                        <RedStar>*</RedStar>Diary Topic
                    </StyledLabel>
                    <StyledField name="diaryTitle" placeholder="Diary Topic" />
                    <ErrorMessage name="diaryTitle">
                        {(errMsg) => <FormError errorMessage={errMsg} />}
                    </ErrorMessage>

                    {/* <StyledLabel htmlFor="email">Email</StyledLabel>
                    <StyledField name="email" placeholder="email" />
                    <ErrorMessage name="email">
                        {(errMsg) => <FormError errorMessage={errMsg} />}
                    </ErrorMessage>

                    <StyledLabel htmlFor="job">Job</StyledLabel>
                    <StyledField name="job" placeholder="job" />

                    <StyledLabel htmlFor="instagram">Instagram</StyledLabel>
                    <StyledField
                        id="instagram"
                        name="sns.instagram"
                        placeholder="instagram"
                    />

                    <StyledLabel htmlFor="facebook">Facebook</StyledLabel>
                    <StyledField
                        id="facebook"
                        name="sns.facebook"
                        placeholder="facebook"
                    />

                    <StyledLabel htmlFor="twitter">Twitter</StyledLabel>
                    <StyledField
                        id="twitter"
                        name="sns.twitter"
                        placeholder="twitter"
                    />

                    <StyledLabel htmlFor="github">Github</StyledLabel>
                    <StyledField
                        id="github"
                        name="sns.github"
                        placeholder="github"
                    /> */}
                    <ButtonGroup>
                        <StyledButton type="submit">저장</StyledButton>
                        <StyledButton
                            onClick={() => {
                                navigate("/main/profile");
                            }}
                        >
                            취소
                        </StyledButton>
                    </ButtonGroup>
                </StyledForm>
            </Formik>
        </Wrapper>
    );
}
