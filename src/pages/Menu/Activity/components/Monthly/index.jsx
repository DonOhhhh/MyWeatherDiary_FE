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
    & div:first-of-type {
        grid-column-start: ${({ startCol }) => startCol};
    }
    height: calc(104px * 6);
`;

const CalendarCell = styled.div`
    /* border-left: 1px solid black;
    border-top: 1px solid black; */
    border: 1px solid black;
    font-family: Jua;
    position: relative;
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
    console.log(emotion);
    switch (emotion) {
        case 0:
            return <Sunny width={100} height={100} />;
        case 1:
            return <Cloudy width={100} height={100} />;
        case 2:
            return <Rainy width={100} height={100} />;
        case 3:
            return <Thunder width={100} height={100} />;
    }
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Monthly() {
    const dispatch = useDispatch();
    const calendar = useSelector((state) => state.activity);
    const [startCol, setStartCol] = useState(1);
    const [curYear, setCurYear] = useState(new Date().getFullYear());
    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const [curMonthEmotions, setCurMonthEmotions] = useState([]);
    useEffect(() => {
        const date = new Date(curYear, curMonth, 1).toLocaleDateString(
            "en-US",
            {
                weekday: "short",
            }
        );
        setStartCol(days.indexOf(date) + 1);
    }, []);

    useEffect(() => {
        const res = calendar.filter(
            ({ date_format }) =>
                new Date(date_format).getMonth() === curMonth &&
                new Date(date_format).getFullYear() === curYear
        );
        // .map(({ emotion }) => emotion);
        console.log(res);
        setCurMonthEmotions(res);
    }, [calendar, curMonth, curYear]);

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
                <CalendarTable startCol={startCol}>
                    {curMonthEmotions.map(({ emotion }, i) => (
                        <CalendarCell key={i}>
                            {i + 1}
                            <EmotionBox>{getEmoji(Number(emotion))}</EmotionBox>
                        </CalendarCell>
                    ))}
                    {/* {new Array(30).fill().map((_, i) => {
                        return <CalendarCell key={i}>{i + 1}</CalendarCell>;
                    })} */}
                </CalendarTable>
            </CalendarBox>
        </Wrapper>
    );
}
