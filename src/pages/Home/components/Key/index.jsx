import axios from "axios";
import {
    StyledButton,
    StyledField,
    StyledForm,
    StyledLabel,
} from "../StyledFormik";
import { useDispatch, useSelector } from "react-redux";
import { getKey } from "../../reducer/signupSlice";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Key() {
    const nav = useNavigate();
    const initialValues = useSelector((state) => state.signup);
    const onSubmit = ({ key }) => {
        console.log(key);
        alert("전송되었습니다.");
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <StyledForm>
                <StyledLabel
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "10px",
                    }}
                >
                    Key
                </StyledLabel>
                <StyledField
                    name="key"
                    disabled
                    style={{ backgroundColor: "white" }}
                />
                <StyledButton type="submit">이메일로 전송</StyledButton>
                <StyledButton
                    onClick={(e) => {
                        e.preventDefault();
                        nav("/home/login");
                    }}
                >
                    로그인 화면으로
                </StyledButton>
            </StyledForm>
        </Formik>
    );
}
