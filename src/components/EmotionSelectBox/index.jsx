import styled from "@emotion/styled";
import defaultCloudy from "../../icons/cloudy/default.svg";
import defaultSunny from "../../icons/sunny/default.svg";
import defaultRainy from "../../icons/rainy/default.svg";
import defaultThunder from "../../icons/thunder/default.svg";
import clickedSunny from "../../icons/sunny/clicked.svg";
import clickedCloudy from "../../icons/cloudy/clicked.svg";
import clickedRainy from "../../icons/rainy/clicked.svg";
import clickedThunder from "../../icons/thunder/clicked.svg";

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

export default function EmotionSelectBox({ tmpDiary, setTmpDiary }) {
    return (
        <Container>
            <EmotionIcon
                type="radio"
                id="good"
                value="good"
                name="emotion"
                src={tmpDiary.emotion === "good" ? clickedSunny : defaultSunny}
                onClick={(e) => {
                    setTmpDiary({
                        ...tmpDiary,
                        emotion: e.target.value,
                    });
                }}
                defaultChecked={tmpDiary.emotion === "good"}
            />
            <EmotionIcon
                type="radio"
                id="so so"
                value="so so"
                name="emotion"
                src={
                    tmpDiary.emotion === "so so" ? clickedCloudy : defaultCloudy
                }
                defaultChecked={tmpDiary.emotion === "so so"}
                onClick={(e) => {
                    setTmpDiary({
                        ...tmpDiary,
                        emotion: e.target.value,
                    });
                }}
            />
            <EmotionIcon
                type="radio"
                id="bad"
                value="bad"
                name="emotion"
                src={tmpDiary.emotion === "bad" ? clickedRainy : defaultRainy}
                defaultChecked={tmpDiary.emotion === "bad"}
                onClick={(e) => {
                    setTmpDiary({
                        ...tmpDiary,
                        emotion: e.target.value,
                    });
                }}
            />
            <EmotionIcon
                type="radio"
                id="terrible"
                value="terrible"
                name="emotion"
                src={
                    tmpDiary.emotion === "terrible"
                        ? clickedThunder
                        : defaultThunder
                }
                defaultChecked={tmpDiary.emotion === "terrible"}
                onClick={(e) => {
                    setTmpDiary({
                        ...tmpDiary,
                        emotion: e.target.value,
                    });
                }}
            />
        </Container>
    );
}
