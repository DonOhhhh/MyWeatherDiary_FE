import styled from "@emotion/styled";
import { Edit3, Plus } from "react-feather";
import { Link } from "react-router-dom";

const Container = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    --size: 50px;
    position: fixed;
    transform: translate(400px, 400px);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background-color: #ebf5ff;
    & svg {
        stroke: black;
    }
    &:hover {
        background-color: #c5e3ff;
        cursor: pointer;
        & svg {
            stroke: white;
        }
    }
`;

export default function NewDiary() {
    return (
        <Container to="/main/newdiary">
            <Plus size={30} />
        </Container>
    );
}
