import styled from "@emotion/styled";
import { ReactComponent as ArrowRight } from "../../icons/arrow_right.svg";
import { ReactComponent as ArrowLeft } from "../../icons/arrow_left.svg";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 450px;
    width: 100%;
    z-index: 5;
    position: relative;
    top: 0px;
    /* padding: 10px; */
    /* margin-bottom: -40px; */
`;

const ArrowCover = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: auto;
    height: auto;
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

export default function ContentReplaceButton({
    size,
    leftClick,
    rightClick,
    onClick,
}) {
    return (
        <Container>
            <ArrowCover
                onClick={leftClick}
                style={{ transform: "translateX(-10px)" }}
            >
                <ArrowLeft
                    width={size}
                    height={size}
                    style={{ transform: "translateX(-1px)" }}
                />
            </ArrowCover>
            <ArrowCover
                onClick={rightClick}
                style={{ transform: "translateX(10px)" }}
            >
                <ArrowRight
                    width={size}
                    height={size}
                    style={{ transform: "translateX(1px)" }}
                />
            </ArrowCover>
        </Container>
    );
}
