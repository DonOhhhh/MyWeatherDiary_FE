import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFakeData } from "../../reducer/activitySlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 300px;
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
    background-color: ${({ cont }) => {
        switch (true) {
            case cont < 1:
                return color[0];
            case cont < 3:
                return color[1];
            case cont < 5:
                return color[2];
            case cont < 7:
                return color[3];
            default:
                return color[4];
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

const color = ["#d1e5ff", "#afd2ff", "#89bcff", "#60a5ff", "#3a8fff"];
const color2 = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

export default function Yearly({ calendar, onCheckboxClick }) {
    const [startRow, setStartRow] = useState(1);
    useEffect(() => {
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
                    onChange={onCheckboxClick}
                />
                <label htmlFor="fromJan1st">1월 1일부터</label>
            </div>
            <Container>
                <MonthTable>
                    {months.map((e, i) => (
                        <MonthCell key={i}>{e}</MonthCell>
                    ))}
                </MonthTable>
                <DayTable>
                    {days.map((e, i) => (
                        <DayCell key={i}>{e}</DayCell>
                    ))}
                </DayTable>
                <ContributionTable startRow={startRow}>
                    {calendar.map(({ date_format, contentsNum }, i) => (
                        <Tooltip
                            placement="top"
                            title={`날짜 : ${date_format}, 일기 갯수 : ${contentsNum}`}
                            key={i}
                        >
                            <ContributionTableCell cont={contentsNum} />
                        </Tooltip>
                    ))}
                </ContributionTable>
            </Container>
        </Wrapper>
    );
}
