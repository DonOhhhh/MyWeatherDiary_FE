import styled from "@emotion/styled";
import Divider from "../Divider";
import clickedSunny from "../../icons/sunny/clicked.svg";
import clickedCloudy from "../../icons/cloudy/clicked.svg";
import clickedRainy from "../../icons/rainy/clicked.svg";
import clickedThunder from "../../icons/thunder/clicked.svg";
import Pagination from "../Pagination";
import ContentReplaceButton from "../ContentReplaceButton";
import { useMemo, useState } from "react";
import PostUpdateDeleteBtns from "../PostUpdateDeleteBtns";
import { useOverlay } from "../../Context/OverlayProvider";

const TotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    margin: 10px 0;

    width: 100%;
    height: auto;

    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 15px;
`;

const ContentsContainer = styled.div`
    display: flex;
    padding: 0;
    margin: 0 10px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 10px;
    width: 100%;
    height: auto;
`;

const TopBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    height: 48px;
    width: auto;
    margin: 0 10px;
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

const EmotionBox = styled.span`
    width: 40px;
    height: 40px;
    background-image: url(${({ src }) => src});
    background-size: cover;
`;

const DayBox = styled.span`
    width: auto;
    height: auto;
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
`;

const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 540px;
    min-height: 600px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 15px;

    background-image: url(${({ src }) => src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const CommentBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    padding: 10px 20px;
    gap: 10px;
    width: 540px;
    height: fit-content;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    border-radius: 15px;

    font-family: "Jua";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 40px;
    word-break: break-all;
`;

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const emotionEmoji = {
    good: clickedSunny,
    "so so": clickedCloudy,
    bad: clickedRainy,
    terrible: clickedThunder,
};

export default function Post({ postId, emotion, date, contents, ...props }) {
    const dayStr = useMemo(weekday[new Date(date).getDay()], [date]);
    const dateStr = useMemo(date, [date]);
    const [contentNum, setContentNum] = useState(0);
    const { imgSrc, comment } = useMemo(contents[contentNum], [
        contents,
        contentNum,
    ]);
    const { diarys, setDiarys } = useOverlay();

    return (
        <TotalContainer>
            <PostUpdateDeleteBtns
                style={{
                    transform: "translateX(580px)",
                    marginBottom: "-100px",
                }}
            />
            <TopBox>
                <EmotionBox src={emotionEmoji[emotion]} />
                <DateBox>{dateStr}</DateBox>
                <DayBox>{dayStr}</DayBox>
            </TopBox>
            <ContentReplaceButton
                size={24}
                leftClick={() => {
                    if (contentNum - 1 < 0) setContentNum(contents.length - 1);
                    else if (contentNum - 1 === contents.length)
                        setContentNum(0);
                    else setContentNum(contentNum - 1);
                }}
                rightClick={() => {
                    if (contentNum + 1 < 0) setContentNum(contents.length - 1);
                    else if (contentNum + 1 === contents.length)
                        setContentNum(0);
                    else setContentNum(contentNum + 1);
                }}
            />
            <Pagination
                dotSize={10}
                length={contents.length}
                curIndex={contentNum}
                style={{
                    position: "relative",
                    top: "0px",
                    left: "0px",
                }}
            />
            <ContentsContainer>
                <ContentContainer contentNum={contentNum}>
                    {imgSrc && <Image src={imgSrc} />}
                    {imgSrc && comment && (
                        <Divider lineColor="#E0E0E0" width="100%" />
                    )}
                    {comment && <CommentBox>{comment}</CommentBox>}
                </ContentContainer>
            </ContentsContainer>
        </TotalContainer>
    );
}
