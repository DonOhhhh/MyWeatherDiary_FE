import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../../common/components/FormError";
import { StyledField } from "../../../StyledFormik";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export default function InputBox() {
    return (
        <Wrapper>
            <StyledField name="email" placeholder="Email" />
            <ErrorMessage name="email">
                {(errorMsg) => <FormError errorMessage={errorMsg} />}
            </ErrorMessage>
            <StyledField
                type="password"
                placeholder="Password"
                name="password"
            />
            <ErrorMessage name="password">
                {(errorMsg) => <FormError errorMessage={errorMsg} />}
            </ErrorMessage>
        </Wrapper>
    );
}
