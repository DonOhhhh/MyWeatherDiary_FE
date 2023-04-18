import styled from "@emotion/styled";
import { ReactComponent as Sunny } from "../../../../../../../common/icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../../../../../../common/icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../../../../../../common/icons/rainy.svg";
import { ReactComponent as Thunder } from "../../../../../../../common/icons/thunder.svg";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    height: fit-content;
    width: auto;
    padding: 10px;
`;

const DateBox = styled.div`
    display: flex;
    align-items: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    text-align: center;
`;

const EmotionBox = styled.div`
    display: inline-block;
`;

const DayBox = styled.span`
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
`;

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const emotionEmoji = {
//     0: clickedSunny,
//     1: clickedCloudy,
//     2: clickedRainy,
//     3: clickedThunder,
// };

const colors = ["#fff765", "#3d3d3d", "#296dff", "#e8080f"];

const emotionEmoji = (emotion, size = 40) => {
    let IconComponent;
    switch (emotion) {
        case "1":
            IconComponent = Sunny;
            break;
        case "2":
            IconComponent = Cloudy;
            break;
        case "3":
            IconComponent = Rainy;
            break;
        case "4":
            IconComponent = Thunder;
            break;
        default:
            IconComponent = Sunny;
    }
    return <IconComponent fill={colors[Number(emotion) - 1]} />;
};

export default function TopBox({ emotion, date }) {
    const offset = date.getTimezoneOffset() * 60000;
    const today = new Date(date - offset);
    const dayStr = weekday[new Date(date).getDay()];
    return (
        <Container>
            <EmotionBox>{emotionEmoji(emotion)}</EmotionBox>
            <DateBox>{today.toISOString().slice(0, 10)}</DateBox>
            <DayBox>{dayStr}</DayBox>
        </Container>
    );
}
