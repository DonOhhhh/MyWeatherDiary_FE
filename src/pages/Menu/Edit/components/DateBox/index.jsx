import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from "./components/CustomInput";
import { Container, EditItemBox } from "../Styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendar } from "../../../Activity/reducer/activitySlice";

export default function DateBox() {
    const [excludeDates, setExcludeDates] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCalendar(new Date().getFullYear())).then((state) => {
            const result = state.payload.map(
                ({ postDate }) => new Date(postDate.split(" ")[0])
            );
            // console.log(result);
            setExcludeDates(result);
        });
    }, []);

    return (
        <Container role="group" aria-labelledby="Date-box">
            <EditItemBox>
                <Field name="postDate">
                    {({ form, field }) => {
                        const { setFieldValue } = form;
                        const { value } = field;
                        return (
                            <ReactDatePicker
                                selected={value ? new Date(value) : value}
                                onChange={(val) =>
                                    setFieldValue("postDate", val)
                                }
                                dateFormat="yyyy-MM-dd"
                                excludeDates={excludeDates}
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
