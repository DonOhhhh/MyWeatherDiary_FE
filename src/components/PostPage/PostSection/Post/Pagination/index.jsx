import styled from "@emotion/styled";
import { v4 } from "uuid";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 7px;
    margin: 0;
    padding: 0;
    min-width: 100px;
    width: auto;
    height: auto;
    border-radius: 15px;
    transform: translateY(-25px);
    margin-bottom: -12px;

    /* background-color: rgba(0, 0, 0, 0.3); */
    /* border: 1px solid black; */
`;

const Dot = styled.div`
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    border-radius: 100%;
    background-color: #ddd;
`;

const CurrentDot = styled(Dot)`
    width: ${({ size }) => `${size + 2}px`};
    height: ${({ size }) => `${size + 2}px`};
    background-color: lightblue;
`;

export default function Pagination({ dotSize, length, curIndex, ...props }) {
    return (
        <Container style={{ ...props.style }}>
            {new Array(length).fill().map((_, i) => {
                return curIndex === i ? (
                    <CurrentDot size={dotSize} key={v4()} />
                ) : (
                    <Dot size={dotSize} key={v4()} />
                );
            })}
        </Container>
    );
}
