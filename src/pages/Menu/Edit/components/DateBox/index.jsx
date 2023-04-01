import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import EditItemBox from "../EditItemBox";
import FormError from "../../../../../common/components/FormError";
import Container from "../EditContainer";

export default function DateBox() {
    return (
        <Container role="group" aria-labelledby="Date-box">
            <EditItemBox>날짜를 선택해주세요</EditItemBox>
            <EditItemBox>
                <Field type="date" name="date" style={{ border: "0" }} />
            </EditItemBox>
            <ErrorMessage name="date" component={FormError} />
        </Container>
    );
}
