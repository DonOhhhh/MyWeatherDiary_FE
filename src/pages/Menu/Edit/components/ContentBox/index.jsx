import styled from "@emotion/styled";
import { ErrorMessage, Field, FieldArray } from "formik";
import { useCallback } from "react";
import FormError from "../../../../../common/components/FormError";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
    gap: 5px;

    width: 100%;
    height: auto;

    border: 1px dashed #a3a3a3;
    border-radius: 15px;
`;

const InputImageBox = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 200px;

    background: url(${({ src }) => src});
    background-size: cover;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;

    &:hover {
        cursor: pointer;
    }
`;

const InputComment = styled.textarea`
    display: inline-block;
    vertical-align: top;

    width: 100%;
    height: 300px;
    padding: 1rem;

    font-family: "Jua";
    font-size: 20px;
    font-weight: 400;

    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default function ContentBox({ pushFunction }) {
    return (
        <div role="group" aria-labelledby="Content-box">
            <FieldArray name="contents">
                {(fieldArrayProps) => {
                    const { remove, push, form } = fieldArrayProps;
                    pushFunction = push;
                    const { contents } = form.values;
                    return (
                        <>
                            {contents.map(({ id, imgSrc, comment }, index) => (
                                <div key={index}>
                                    <button onClick={remove}>-</button>
                                    <br />
                                    <Field
                                        type="file"
                                        name={`contents[${index}].imgSrc`}
                                        accept="image/*"
                                        multiple
                                    />
                                    <br />
                                    <Field
                                        as="textarea"
                                        name={`contents[${index}].comment`}
                                    />
                                </div>
                            ))}
                        </>
                    );
                }}
            </FieldArray>
            <ErrorMessage name="contents" component={FormError} />
        </div>
    );
}
