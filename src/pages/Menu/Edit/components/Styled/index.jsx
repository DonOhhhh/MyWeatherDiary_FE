import styled from "@emotion/styled";
import { Field } from "formik";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: fit-content;
`;

const EditItemBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 10px 0;

    background: #ffffff;
    border: 1px solid #898989;
    border-radius: 10px;

    font-family: "Jua";
    font-size: 16px;
`;

const ContentArea = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const StyledTextArea = styled(Field)`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 15px;
    font-family: Jua;
    font-size: 20px;
    font-weight: 400;
    overflow-y: scroll;
    min-height: 250px;
    height: 100%;
    width: 100%;
`;

export { Container, EditItemBox, StyledTextArea, ContentArea };
