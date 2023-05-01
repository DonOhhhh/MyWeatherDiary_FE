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
const emojis = [Sunny, Cloudy, Rainy, Thunder];
const EmotionToNum = ["HAPPY", "SAD", "NEUTRAL", "ANGER"];
const icons = (emotion, i) => {
    let IconComponent = emojis[i];
    let fillColor = emotion === `${i + 1}` ? colors[i] : "#cacaca";
    const iconSize = 30;
    return (
        <IconComponent width={iconSize} height={iconSize} fill={fillColor} />
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
                <ErrorMessage
                    name="emotion"
                    render={(msg) => <FormError errorMessage={msg} />}
                />
            </EditItemBox>
        </Container>
    );
}
