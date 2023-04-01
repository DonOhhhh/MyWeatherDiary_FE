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

export default function EmotionBox({ emotion }) {
    return (
        <Container role="group" aria-labelledby="Emotion-box">
            <EditItemBox>기분을 선택해주세요</EditItemBox>
            <EditItemBox>
                <label>
                    <IconBox>
                        <StyledField type="radio" name="emotion" value="0" />
                        <Sunny fill={emotion === "0" ? "#ffc350" : "#cacaca"} />
                    </IconBox>
                </label>
                <label>
                    <IconBox>
                        <StyledField type="radio" name="emotion" value="1" />
                        <Cloudy
                            fill={emotion === "1" ? "#3d3d3d" : "#cacaca"}
                        />
                    </IconBox>
                </label>
                <label>
                    <IconBox>
                        <StyledField type="radio" name="emotion" value="2" />
                        <Rainy fill={emotion === "2" ? "#2784DA" : "#cacaca"} />
                    </IconBox>
                </label>
                <label>
                    <IconBox>
                        <StyledField type="radio" name="emotion" value="3" />
                        <Thunder
                            fill={emotion === "3" ? "#FFE227" : "#cacaca"}
                        />
                    </IconBox>
                </label>
                <ErrorMessage name="emotion" component={FormError} />
            </EditItemBox>
        </Container>
    );
}
