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
    grid-template-columns: repeat(53, 1fr);
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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(53, 1fr);
    padding: 10px;
    gap: 1px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 12px;
`;

const getContributionColor = (count) => {
    if (count === 0) {
        return "#ebedf0";
    } else if (count <= 5) {
        return "#c6e48b";
    } else if (count <= 10) {
        return "#7bc96f";
    } else if (count <= 20) {
        return "#239a3b";
    } else {
        return "#196127";
    }
};

const ContributionTable = ({ contributions }) => {
    // render contribution table
    return (
        <div>
            <Grid>
                {contributions.map((contribution) => (
                    <div
                        key={contribution.date}
                        style={{
                            backgroundColor: getContributionColor(
                                contribution.count
                            ),
                        }}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default function Yearly() {
    return (
        <Container>
            <Table>
                {new Array(365).fill().map(() => (
                    <Cell />
                ))}
            </Table>
        </Container>
    );
}
