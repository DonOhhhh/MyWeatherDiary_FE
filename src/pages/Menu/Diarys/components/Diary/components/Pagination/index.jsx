import styled from "@emotion/styled";
import { ReactComponent as ArrowRight } from "../../icons/arrow_right.svg";
import { ReactComponent as ArrowLeft } from "../../icons/arrow_left.svg";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    border-radius: 15px;

    /* background-color: rgba(0, 0, 0, 0.3); */
    /* border: 1px solid black; */
`;

const Pages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
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

const ArrowCover = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: fit-content;
    padding: 5px;
    margin: 0;
    border: 0;

    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    &:hover {
        background-color: rgba(200, 200, 200, 0.8);
        cursor: pointer;
    }
`;

export default function Pagination({ page, onClick, length, ...props }) {
    const iconSize = 16;
    const dotSize = 8;
    return (
        <Container style={{ ...props.style }}>
            <ArrowCover>
                <ArrowLeft
                    width={iconSize}
                    height={iconSize}
                    onClick={() => {
                        if (page === 0) {
                            onClick(length - 1);
                        } else {
                            onClick(page - 1);
                        }
                    }}
                />
            </ArrowCover>
            <Pages>
                {new Array(length).fill().map((_, i) => {
                    return page === i ? (
                        <CurrentDot size={dotSize} key={i} />
                    ) : (
                        <Dot size={dotSize} key={i} />
                    );
                })}
            </Pages>
            <ArrowCover>
                <ArrowRight
                    width={iconSize}
                    height={iconSize}
                    onClick={() => {
                        if (page === length - 1) {
                            onClick(0);
                        } else {
                            onClick(page + 1);
                        }
                    }}
                />
            </ArrowCover>
        </Container>
    );
}
