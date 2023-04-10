import styled from "@emotion/styled";
import { Field, Form } from "formik";

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 50%;
    gap: 10px;
`;

export const StyledField = styled(Field)`
    width: 100%;
    padding: 20px 30px;
    border: 5px solid #c4c4c4;
    border-radius: 20px;

    font-family: "Jua";
    font-weight: 400;
    font-size: 36px;
    color: #c5e3ff;

    caret-color: black;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #c5e3ff;
    }
`;

export const StyledButton = styled.button`
    background: #c5e3ff;
    border: 3px solid #ffffff;
    border-radius: 20px;
    padding: 0;
    width: 100%;
    height: 3rem;

    font-family: "Jua";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    color: white;

    &:hover {
        background-color: #5d9dd8;
        cursor: pointer;
    }
`;

export const StyledLabel = styled.label`
    font-family: "Jua";
    font-weight: 400;
    font-size: 36px;
    color: white;
    margin: 0;
    padding: 0;
`;
