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
            <StyledField name="enterKey" placeholder="enter your key..." />
            <ErrorMessage name="enterKey">
                {(errorMsg) => <FormError>{errorMsg}</FormError>}
            </ErrorMessage>
        </Wrapper>
    );
}
