import styled from "@emotion/styled";

const Container = styled.div`
    display: inline-block;
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 2px;
    border: 3px solid white;
    border-radius: 10px;
    &:hover {
        & svg {
            stroke: black;
        }
        cursor: pointer;
    }
`;

function IconContainer({ children }) {
    return <Container>{children}</Container>;
}

export default IconContainer;
