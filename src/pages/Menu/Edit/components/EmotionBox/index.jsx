import styled from "@emotion/styled";
import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";
import { ReactComponent as Sunny } from "../../icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../icons/rainy.svg";
import { ReactComponent as Thunder } from "../../icons/thunder.svg";
import { Container, EditItemBox } from "../Styled";

const IconBox = styled.div`
    appearance: none;
    display: inline-block;
    margin: 0;
    padding: 0;
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
    const iconSize = 30;
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
        <IconComponent
            width={iconSize}
            height={iconSize}
            fill={emotion === `${i + 1}` ? colors[i] : "#cacaca"}
        />
    );
};

export default function EmotionBox({ emotion }) {
    return (
        <Container role="group" aria-labelledby="Emotion-box">
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
