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
    width: 40px;
    height: 40px;
    background-image: url(${({ src }) => src});
    background-size: cover;
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

const emotionEmoji = (emotion, size = 40) => {
    switch (emotion) {
        case "0":
            return <Sunny width={size} height={size} />;
        case "1":
            return <Cloudy width={size} height={size} />;
        case "2":
            return <Rainy width={size} height={size} />;
        case "3":
            return <Thunder width={size} height={size} />;
    }
};

export default function TopBox({ emotion, date }) {
    const dayStr = weekday[new Date(date).getDay()];
    return (
        <Container>
            <EmotionBox>{emotionEmoji(emotion)}</EmotionBox>
            <DateBox>{date}</DateBox>
            <DayBox>{dayStr}</DayBox>
        </Container>
    );
}
