import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "./components/CustomInput";
import { Container, EditItemBox } from "../Styled";

export default function DateBox({ date }) {
    return (
        <Container role="group" aria-labelledby="Date-box">
            <EditItemBox>
                <Field name="postDate">
                    {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                            <ReactDatePicker
                                selected={new Date(value)}
                                onChange={(val) =>
                                    setFieldValue("postDate", val)
                                }
                                dateFormat="yyyy-MM-dd"
                                customInput={<CustomInput />}
                            />
                        );
                    }}
                </Field>
            </EditItemBox>
            <ErrorMessage name="date" component={FormError} />
        </Container>
    );
}
