import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";
import { ReactComponent as Sunny } from "../../icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../icons/rainy.svg";
import { ReactComponent as Thunder } from "../../icons/thunder.svg";
import EditItemBox from "../EditItemBox";
import Container from "../EditContainer";

const IconBox = styled.div`
    appearance: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    &:hover {
        cursor: pointer;
    }
`;

const StyledField = styled(Field)`
    appearance: none;
    display: inline-block;
    margin: 0;
    padding: 0;
`;

const colors = ["#fff765", "#3d3d3d", "#296dff", "#e8080f"];
const icons = (emotion, i) => {
    let IconComponent;
    switch (i) {
        case 0:
            IconComponent = Sunny;
            break;
        case 1:
            IconComponent = Cloudy;
            break;
        case 2:
            IconComponent = Rainy;
            break;
        case 3:
            IconComponent = Thunder;
            break;
        default:
            IconComponent = Sunny;
    }
    return (
        <IconComponent fill={emotion === `${i + 1}` ? colors[i] : "#cacaca"} />
    );
};

export default function EmotionBox({ emotion }) {
    return (
        <Container role="group" aria-labelledby="Emotion-box">
            <EditItemBox>기분을 선택해주세요</EditItemBox>
            <EditItemBox>
                {new Array(4).fill().map((_, i) => (
                    <label key={i}>
                        <IconBox>
                            <StyledField
                                type="radio"
                                name="emotion"
                                value={`${i + 1}`}
                            />
                            {icons(emotion, i)}
                        </IconBox>
                    </label>
                ))}
                <ErrorMessage name="emotion" component={FormError} />
            </EditItemBox>
        </Container>
    );
}
