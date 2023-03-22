import styled from "@emotion/styled";
import { useState } from "react";
import { Form } from "react-router-dom";
import CustomButton from "../CustomButton";
import InputBox from "./components/InputBox";
import Section from "./components/Section";
import IconContainer from "./components/IconContainer";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import { Check, Copy, Send } from "react-feather";
import FormError from "../../../../common/components/FormError";
import axios from "axios";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 35px;
    gap: 5px;

    position: relative;
    width: 700px;
    height: 300px;

    background: #c5e3ff;
    border: 5px solid #ffffff;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`;

function CreateDiary() {
    const formik = useFormik({
        initialValues: {
            topic: "",
            key: "key",
            email: "",
        },
        onSubmit: async (values) => {
            console.log(values);
            // if (values.topic) {
            //     const res = await axios.post("/auth/register", {
            //         diary_title: values.topic,
            //     });
            //     values.key = res.data.enter_key;
            //     setSubmit(true);
            //     values.topic = null;
            // }
        },
        validate: (values) => {
            const { topic, email } = values;
            let errors = {};
            if (!topic) {
                errors.topic = "Required";
            }
            if (!email) {
                errors.email = "Required";
            } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
                errors.email = "Invalid email format";
            }
            return errors;
        },
    });
    const [copy, setCopy] = useState(false);
    const [send, setSend] = useState(false);
    const [submit, setSubmit] = useState(false);
    return (
        <Container onSubmit={formik.handleSubmit}>
            {!submit ? (
                <>
                    <InputBox
                        type="text"
                        placeholder="Input diary topic"
                        name="topic"
                        onChange={formik.handleChange}
                        value={formik.values.topic}
                    />
                    {formik.errors.topic ? (
                        <FormError errorMessage={formik.errors.topic} />
                    ) : null}
                    <CustomButton
                        type="submit"
                        onClick={() => {
                            setSubmit(true);
                        }}
                    >
                        Create
                    </CustomButton>
                </>
            ) : (
                <>
                    <Section>
                        <InputBox
                            disabled
                            value={formik.values.key}
                            style={{
                                backgroundColor: "white",
                                textAlign: "center",
                            }}
                            name="key"
                        />
                        <IconContainer>
                            {!copy ? (
                                <Copy
                                    size={40}
                                    onClick={() => {
                                        window.navigator.clipboard.writeText(
                                            formik.values.key
                                        );
                                        setCopy(true);
                                        setTimeout(() => setCopy(false), 2000);
                                    }}
                                    color="#a3a3a3"
                                />
                            ) : (
                                <Check size={40} color="#6cb53d" />
                            )}
                        </IconContainer>
                    </Section>
                    <Section>
                        <InputBox
                            type="text"
                            required
                            placeholder="Input email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <IconContainer>
                            {!send ? (
                                <Send
                                    size={40}
                                    color="#a3a3a3"
                                    onClick={() => {
                                        setSend(true);
                                        setTimeout(() => setSend(false), 2000);
                                    }}
                                />
                            ) : (
                                <Check size={40} color="#6cb53d" />
                            )}
                        </IconContainer>
                    </Section>
                    {formik.errors.email ? (
                        <FormError errorMessage={formik.errors.email} />
                    ) : null}
                </>
            )}
        </Container>
    );
}

export default CreateDiary;
