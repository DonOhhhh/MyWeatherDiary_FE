import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: 70px;

    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 15px;
`;
const EmotionIcon = styled.input`
    appearance: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-image: url(${({ src }) => src});
    background-size: cover;
    /* border: 3px solid rgba(0, 0, 0, 0); */
    &:hover {
        /* border: 3px solid #d3eaff; */
        cursor: pointer;
    }
`;

export default function EmotionBox() {
    return (
        <div role="group" aria-labelledby="Emotion-box">
            <label>
                <Field type="radio" name="emotion" value="0" />
                sunny
            </label>
            <label>
                <Field type="radio" name="emotion" value="1" />
                cloudy
            </label>
            <label>
                <Field type="radio" name="emotion" value="2" />
                rainy
            </label>
            <label>
                <Field type="radio" name="emotion" value="3" />
                thunder
            </label>
            <ErrorMessage name="emotion" component={FormError} />
        </div>
    );
}
