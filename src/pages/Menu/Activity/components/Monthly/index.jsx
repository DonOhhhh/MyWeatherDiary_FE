import styled from "@emotion/styled";
import { ReactComponent as Sunny } from "../../../../../common/icons/sunny.svg";
import { ReactComponent as Cloudy } from "../../../../../common/icons/cloudy.svg";
import { ReactComponent as Rainy } from "../../../../../common/icons/rainy.svg";
import { ReactComponent as Thunder } from "../../../../../common/icons/thunder.svg";
import { ReactComponent as ArrowLeft } from "../../icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../icons/arrow_right.svg";
import { ReactComponent as Checkmark } from "../../icons/checked.svg";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
    check,
    clearSelected,
    fetchSelectedDiarys,
} from "../../reducer/activitySlice";
import produce from "immer";
import { ButtonBox, ExportButton, takeScreenshot } from "../..";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: fit-content;
    position: relative;
`;

const TopBox = styled.div`
    width: 100%;
    height: fit-content;
    margin-bottom: 20px;
    font-family: Jua, sans-serif;
    font-weight: 1000;
    font-size: 40px;
    font-style: italic;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    height: calc(56px * ${({ rows }) => rows});
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
    z-index: 2;
`;

const ActivatedCalendarCell = styled(CalendarCell)`
    &:hover {
        cursor: pointer;
        border: 5px solid lightgreen;
        z-index: 3;
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
    z-index: 2;
    background-color: transparent;
`;

const CheckmarkBox = styled(EmotionBox)`
    justify-content: flex-end;
    align-items: flex-start;
    padding: 5px;
`;

const IconBox = styled.div`
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    padding: 5px;
    background-color: #ebf5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color: #85c2ff;
    }
`;

const BottomBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const SelectedShowBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Jua;
`;

const make_2digit = (n) => (n < 10 ? "0" + n : n);

const getEmoji = (emotion) => {
    const iconSize = 40;
    switch (emotion) {
        case "1":
            return <Sunny width={iconSize} height={iconSize} fill="#fff765" />;
        case "2":
            return <Cloudy width={iconSize} height={iconSize} fill="#3d3d3d" />;
        case "3":
            return <Rainy width={iconSize} height={iconSize} fill="#296dff" />;
        case "4":
            return (
                <Thunder width={iconSize} height={iconSize} fill="#e8080f" />
            );
        default:
            return <div></div>;
    }
};

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

const makeState = (dateObj) => ({
    today: dateObj,
    curYear: dateObj.getFullYear(),
    curMonth: dateObj.getMonth(),
    currentCalendar: getCalendarDays(dateObj.getFullYear(), dateObj.getMonth()),
});

const reducer = (state, action) => {
    const dateObj = action.payload;
    switch (action.type) {
        case "next":
            return makeState(dateObj);
        case "prev":
            return makeState(dateObj);
        default:
            return new Error("알 수 없는 action입니다.");
    }
};

function Monthly({ calendar }) {
    const initialState = makeState(new Date());
    const [state, dispatch] = useReducer(reducer, initialState);
    const [diarys, setDiarys] = useState({});
    const CalendarRef = useRef(null);
    const actionDispatch = useDispatch();
    useEffect(() => {
        if (calendar.length) {
            let diaryHashMap = {};
            calendar
                .filter(
                    ({ date_format }) =>
                        new Date(date_format).getFullYear() === state.curYear &&
                        new Date(date_format).getMonth() === state.curMonth
                )
                .forEach(({ date_format, emotion, selected }) => {
                    if (Number(emotion) > 0) {
                        diaryHashMap[new Date(date_format).getDate()] = {
                            emotion,
                            selected,
                        };
                    }
                });
            setDiarys(diaryHashMap);
        }
    }, [calendar, state.today]);
    return (
        <Wrapper>
            <CalendarBox ref={CalendarRef}>
                <TopBox>
                    <IconBox
                        onClick={() =>
                            dispatch({
                                type: "prev",
                                payload: new Date(
                                    state.curYear,
                                    state.curMonth - 1,
                                    1
                                ),
                            })
                        }
                    >
                        <ArrowLeft width={30} height={30} />
                    </IconBox>
                    {`${state.curYear}/${make_2digit(state.curMonth + 1)}`}
                    <IconBox
                        onClick={() =>
                            dispatch({
                                type: "prev",
                                payload: new Date(
                                    state.curYear,
                                    state.curMonth + 1,
                                    1
                                ),
                            })
                        }
                    >
                        <ArrowRight width={30} height={30} />
                    </IconBox>
                </TopBox>
                <DateBox>
                    <DateCell color="red">Sun</DateCell>
                    <DateCell color="black">Mon</DateCell>
                    <DateCell color="black">Tue</DateCell>
                    <DateCell color="black">Wed</DateCell>
                    <DateCell color="black">Thu</DateCell>
                    <DateCell color="black">Fri</DateCell>
                    <DateCell color="blue">Sat</DateCell>
                </DateBox>
                <CalendarTable rows={state.currentCalendar.length / 7}>
                    {state.currentCalendar.map((e, i) => {
                        const [month, date, day] = [
                            e.getMonth(),
                            e.getDate(),
                            e.getDay(),
                        ];

                        return month !== state.curMonth ? (
                            <DisabledCell key={i}>{date}</DisabledCell>
                        ) : diarys[`${date}`]?.emotion ? (
                            <ActivatedCalendarCell
                                key={i}
                                day={day}
                                onClick={() => {
                                    let offset = e.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
                                    let dateOffset = new Date(
                                        e.getTime() - offset
                                    );
                                    actionDispatch(
                                        check(
                                            dateOffset
                                                .toISOString()
                                                .slice(0, 10)
                                        )
                                    );
                                    // const nextState = produce(
                                    //     diarys,
                                    //     (draft) => {
                                    //         draft[`${date}`].selected =
                                    //             !draft[`${date}`].selected;
                                    //     }
                                    // );
                                    // setDiarys(nextState);
                                }}
                            >
                                {date}
                                <EmotionBox>
                                    {getEmoji(diarys[`${date}`]?.emotion)}
                                </EmotionBox>
                                {diarys[`${date}`]?.selected && (
                                    <CheckmarkBox>
                                        <Checkmark width={20} height={20} />
                                    </CheckmarkBox>
                                )}
                            </ActivatedCalendarCell>
                        ) : (
                            <CalendarCell key={i} day={day}>
                                {date}
                            </CalendarCell>
                        );
                    })}
                </CalendarTable>
            </CalendarBox>
            <BottomBox>
                <SelectedShowBox>
                    선택된 일기 개수 :{" "}
                    {calendar.filter(({ selected }) => selected).length}
                </SelectedShowBox>
                <ButtonBox>
                    <ExportButton onClick={() => takeScreenshot(CalendarRef)}>
                        Export to PNG
                    </ExportButton>
                    <ExportButton
                        onClick={() => {
                            const selectedDiaryIds = calendar
                                .filter(({ selected }) => selected)
                                .map(({ id }) => id);
                            if (!selectedDiaryIds.length) {
                                alert("날짜를 선택해주세요");
                                return;
                            }
                            actionDispatch(
                                fetchSelectedDiarys(selectedDiaryIds)
                            );
                        }}
                    >
                        Export to PDF
                    </ExportButton>
                    <ExportButton
                        onClick={() => {
                            actionDispatch(clearSelected());
                        }}
                    >
                        Clear
                    </ExportButton>
                </ButtonBox>
            </BottomBox>
        </Wrapper>
    );
}

export default React.memo(Monthly);
