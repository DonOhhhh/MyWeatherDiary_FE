import styled from "@emotion/styled";

const Container = styled.div`
    width: fit-content;
    height: 200px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    border: 1px solid #848383;
    border-radius: 6px;
    border-collapse: collapse;
`;

const Table = styled.div`
    --size: 15px;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    gap: 5px;
`;

const DisableCell = styled.td`
    --size: 15px;
    width: var(--size);
    height: var(--size);
`;

const DayShowCell = styled.div`
    display: inline-block;
    width: 40px;
    font-size: 15px;
    text-align: start;
`;

const Cell = styled.div`
    display: inline-block;
    --size: 10px;
    border: 0;
    border-radius: 2px;
    background-color: #9d9c9c;
    outline: 1px solid rgb(27 31 35 / 6%);
    width: var(--size);
    height: var(--size);
`;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const color = ["#d1e5ff", "#afd2ff", "#89bcff", "#60a5ff", "#3a8fff"];

export default function Yearly() {
    return (
        <Container>
            <Table>
                {new Array(100).fill().map(() => (
                    <Cell />
                ))}
            </Table>
        </Container>
    );
}
