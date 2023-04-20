import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import EditItemBox from "../EditItemBox";
import FormError from "../../../../../common/components/FormError";
import Container from "../EditContainer";
import DateView from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "./components/CustomInput";

export default function DateBox() {
    return (
        <Container role="group" aria-labelledby="Date-box">
            <EditItemBox>날짜를 선택해주세요</EditItemBox>
            <EditItemBox>
                <Field name="postDate">
                    {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                            <ReactDatePicker
                                selected={value}
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
