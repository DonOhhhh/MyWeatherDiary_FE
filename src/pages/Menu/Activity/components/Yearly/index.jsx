import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ButtonBox, ExportButton, takeScreenshot } from "../..";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: calc(100vh - 200px);
    /* position: relative; */
`;

const Container = styled.div`
    --table-gap: 5px;
    --cell-size: 15px;
    --font-size: calc(var(--cell-size) * 0.7);
    padding: 10px;
    display: grid;
    justify-content: flex-start;
    align-items: center;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "blank months"
        "days table";
    gap: 10px;

    width: fit-content;
    overflow-x: scroll;
    padding: 20px;
    scrollbar-width: thin;

    border: 1px solid #848383;
    border-radius: 6px;
    border-collapse: collapse;

    /* position: absolute;
    left: 0; */
`;

const MonthTable = styled.div`
    grid-area: months;
    display: grid;
    grid-template-columns: repeat(53, 1fr);
    gap: var(--table-gap);
    width: fit-content;
`;

const MonthCell = styled.div`
    width: var(--cell-size);
    display: inline-flex;
    align-items: center;
    font-size: var(--font-size);
    text-align: start;
    color: #727272;
    padding: 0;
`;

const DayTable = styled.div`
    grid-area: days;
    height: 100%;
    /* background-color: red; */

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(--cell-size, auto));
    grid-template-rows: repeat(7, auto);
    grid-auto-flow: column;

    gap: var(--table-gap);
    text-align: end;
`;

const DayCell = styled.div`
    display: inline-flex;
    align-items: center;
    height: var(--cell-size);
    font-size: var(--font-size);
    line-height: var(--font-size);
    text-align: end;
    color: #727272;
    padding: 0;
`;

const ContributionTable = styled.div`
    grid-area: table;
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--cell-size));
    grid-template-rows: repeat(7, auto);
    grid-auto-flow: column;
    gap: var(--table-gap);
    left: 0;
    width: fit-content;
    & div:first-of-type {
        grid-row-start: ${({ startRow }) => startRow};
    }
`;

const ContributionTableCell = styled.div`
    border: 0;
    border-radius: 2px;
    background-color: ${({ emotion }) => {
        switch (emotion) {
            case "1":
                return color[1];
            case "2":
                return color[2];
            case "3":
                return color[3];
            case "4":
                return color[4];
            default:
                return color[0];
        }
    }};
    /* outline: 1px solid rgb(27 31 35 / 6%); */
    width: var(--cell-size);
    height: var(--cell-size);
    /* grid-row-start: 2; */
`;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const color = ["#ebedf0", "#fff765", "#3d3d3d", "#296dff", "#e8080f"];
const color2 = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];
const emotions = ["없음", "좋음", "흐림", "우울함", "화남"];

export default function Yearly({ calendar, onChecked, onCheckboxClick }) {
    const [startRow, setStartRow] = useState(1);
    const [monthPosition, setMonthPosition] = useState([]);
    let curMonth = new Date(calendar[0].date_format).toLocaleString("en-US", {
        month: "short",
    });
    const ContributionTableRef = useRef(null);
    useEffect(() => {
        setMonthPosition([[curMonth, 1]]);
        setStartRow(new Date(calendar[0].date_format).getDay() + 1);
    }, [calendar]);
    return (
        <Wrapper>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                }}
            >
                <input
                    type="checkbox"
                    id="fromJan1st"
                    checked={onChecked}
                    onChange={onCheckboxClick}
                />
                <label htmlFor="fromJan1st">1월 1일부터</label>
            </div>
            <Container ref={ContributionTableRef}>
                <MonthTable>
                    {monthPosition.map(([mon, pos], i) => {
                        // console.log(mon, pos);
                        return (
                            <MonthCell key={i} style={{ gridColumnStart: pos }}>
                                {mon}
                            </MonthCell>
                        );
                    })}
                </MonthTable>
                <DayTable>
                    {days.map((e, i) => (
                        <DayCell key={i}>{e}</DayCell>
                    ))}
                </DayTable>
                <ContributionTable startRow={startRow}>
                    {calendar.map(({ date_format, emotion }, i) => {
                        const dateObj = new Date(date_format);
                        if (dateObj.getDay() === 0) {
                            const month = dateObj.toLocaleString("en-US", {
                                month: "short",
                            });
                            if (curMonth !== month) {
                                curMonth = month;
                                monthPosition.push([
                                    month,
                                    Math.floor((startRow + i) / 7) + 1,
                                ]);
                            }
                        }
                        return (
                            <Tooltip
                                placement="top"
                                title={`날짜 : ${date_format}, 감정 : ${emotions[emotion]}`}
                                key={i}
                            >
                                <ContributionTableCell emotion={emotion} />
                            </Tooltip>
                        );
                    })}
                </ContributionTable>
            </Container>
            <ButtonBox style={{ marginTop: "20px" }}>
                <ExportButton
                    onClick={() => takeScreenshot(ContributionTableRef)}
                >
                    Export to png
                </ExportButton>
            </ButtonBox>
        </Wrapper>
    );
}
