import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Sunny } from "../../../../../common/icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../../../../common/icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../../../../common/icons/rainy.svg";
import { ReactComponent as Thunder } from "../../../../../common/icons/thunder.svg";
import { useEffect, useState } from "react";
import { make_2digit } from "../../reducer/activitySlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    position: relative;
`;

const TopBox = styled.div`
    width: 100%;
    font-family: Jua, sans-serif;
    font-weight: 1000;
    font-size: 40px;
    font-style: italic;
    text-align: center;
    height: fit-content;
`;

const CalendarBox = styled.div`
    width: 100%;
    height: fit-content;
    margin: 20px 0;
    /*  */
    /* height: 100px; */
    /* background-color: red; */
`;

const DateBox = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const DateCell = styled.div`
    color: ${({ color }) => color};
    font-family: Jua;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CalendarTable = styled.div`
    display: grid;
    grid-template: repeat(auto-fit, minmax(50px, 1fr)) / repeat(
            7,
            minmax(10px, 1fr)
        );
    /* & div:first-of-type {
        grid-column-start: ${({ startCol }) => startCol};
    } */
    height: calc(104px * 6);
    border: 1px solid black;
    grid-gap: 1px;
    background-color: black;
`;

const CalendarCell = styled.div`
    /* border-left: 1px solid black;
    border-top: 1px solid black; */
    font-family: Jua;
    position: relative;
    background-color: white;
`;

const OutsideCell = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
`;

const EmotionBox = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const getEmoji = (emotion) => {
    switch (emotion) {
        case 1:
            return <Sunny width={100} height={100} />;
        case 2:
            return <Cloudy width={100} height={100} />;
        case 3:
            return <Rainy width={100} height={100} />;
        case 4:
            return <Thunder width={100} height={100} />;
    }
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Monthly({ calendar }) {
    // calendar.sort((a, b) => new Date(a.date_format) - new Date(b.date_format));
    const [preMonDays, setPreMonDays] = useState(0);
    const [postMonDays, setPostMonDays] = useState(0);
    const [curYear, setCurYear] = useState(new Date().getFullYear());
    const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1);
    const [curMonthEmotions, setCurMonthEmotions] = useState([]);
    useEffect(() => {
        setPreMonDays(new Date(curYear, curMonth, 1).getDay() + 1);
    }, []);

    useEffect(() => {
        console.log(calendar);
        const res = calendar.filter(
            ({ date_format }) =>
                new Date(date_format).getMonth() === curMonth &&
                new Date(date_format).getFullYear() === curYear
        );
        // .map(({ emotion }) => emotion);
        // 0번째 데이터의 day를 구해서 day만큼 앞 달의 날짜를 가져온다.
        // 마지막 데이터의 day를 구해서 (6-day === 0 ? 7 : 6-day)만큼 뒷 달의 날짜를 가져온다.
        console.log(res);
        setCurMonthEmotions(res);
    }, [curMonth, curYear]);

    return (
        <Wrapper>
            <TopBox>{`${curYear}/${
                curMonth < 10 ? "0" + curMonth : curMonth
            }`}</TopBox>
            <CalendarBox>
                <DateBox>
                    <DateCell color="red">Sun</DateCell>
                    <DateCell color="black">Mon</DateCell>
                    <DateCell color="black">Tue</DateCell>
                    <DateCell color="black">Wed</DateCell>
                    <DateCell color="black">Thu</DateCell>
                    <DateCell color="black">Fri</DateCell>
                    <DateCell color="blue">Sat</DateCell>
                </DateBox>
                <CalendarTable>
                    {new Array(42).fill().map((_, i) => (
                        <CalendarCell key={i}>
                            {/* {i + 1} */}
                            {/* <EmotionBox>{getEmoji(Number(emotion))}</EmotionBox> */}
                        </CalendarCell>
                    ))}
                </CalendarTable>
            </CalendarBox>
        </Wrapper>
    );
}
