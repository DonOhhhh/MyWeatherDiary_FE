import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Sunny } from "../../../../../common/icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../../../../common/icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../../../../common/icons/rainy.svg";
import { ReactComponent as Thunder } from "../../../../../common/icons/thunder.svg";
import { ReactComponent as ArrowLeft } from "../../icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../icons/arrow_right.svg";
import { useEffect, useReducer, useState } from "react";
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    height: calc(104px * ${({ rows }) => rows});
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
    padding: 5px;
    color: ${({ day }) => (day === 6 ? "blue" : day === 0 ? "red" : "black")};
    &:hover {
        cursor: pointer;
        border: 1px solid black;
        z-index: 2;
        /* transform: scale(1.05); */
        /* transition: transform 0.3s ease-in-out; */
    }
`;

const DisabledCell = styled(CalendarCell)`
    /* opacity: 0.6; */
    color: #bbb;
    &:hover {
        cursor: auto;
        border: 0;
    }
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

const getCalendarDays = (year, month) => {
    // 현재 달의 1일의 date object를 가져온다.
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    const calendar = [];
    for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
    ) {
        calendar.push(new Date(date));
    }
    return calendar;
};

const initialState = {
    today: new Date(),
    curYear() {
        return this.today.getFullYear();
    },
    curMonth() {
        return this.today.getMonth();
    },
    calendar() {
        return {
            // previous: getCalendarDays(this.curYear(), this.curMonth() - 1),
            current: getCalendarDays(this.curYear(), this.curMonth()),
            // next: getCalendarDays(this.curYear(), this.curMonth() + 1),
        };
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "next":
            return {
                ...state,
                today: state.today.setMonth(state.today.getMonth() + 1),
            };
        case "prev":
            return {
                ...state,
                today: state.today.setMonth(state.today.getMonth() - 1),
            };
        default:
            return new Error("알 수 없는 action입니다.");
    }
};

export default function Monthly({ calendar }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [emotions, setEmotions] = useState([]);
    useEffect(() => {
        const temp = calendar.filter(
            ({ date_format, emotion }) =>
                new Date(date_format).getFullYear() === state.curYear() &&
                new Date(date_format).getMonth() === state.curMonth()
        );
        console.log(temp);
    }, [state.today]);
    // console.log(emotions);
    return (
        <Wrapper>
            <TopBox>
                <ArrowLeft
                    width={50}
                    height={50}
                    style={{ "&:hover": { cursor: "pointer" } }}
                />
                {`${state.curYear()}/${
                    state.curMonth() + 1 < 10
                        ? "0" + (state.curMonth() + 1)
                        : state.curMonth() + 1
                }`}
                <ArrowRight width={50} height={50} />
            </TopBox>
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
                <CalendarTable rows={state.calendar().current.length / 7}>
                    {state.calendar().current.map((e, i) => {
                        return e.getMonth() !== state.curMonth() ? (
                            <DisabledCell key={i}>{e.getDate()}</DisabledCell>
                        ) : (
                            <CalendarCell key={i} day={e.getDay()}>
                                {e.getDate()}
                            </CalendarCell>
                        );
                    })}
                </CalendarTable>
            </CalendarBox>
        </Wrapper>
    );
}
