import styled from "@emotion/styled";
import { Edit3, Plus } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clear } from "../../../Edit/reducer/editSlice";

const Container = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    --size: 50px;
    --color: #aaa;
    position: fixed;
    bottom: 40px;
    right: 30px;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    border-radius: 10px;
    background-color: #ebf5ff;
    color: var(--color);
    text-decoration: none;
    font-size: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    & svg {
        stroke: var(--color);
    }
    &:hover {
        background-color: #c5e3ff;
        cursor: pointer;
        & svg {
            stroke: white;
        }
        color: white;
    }
`;

export default function NewDiary() {
    const dispatch = useDispatch();
    return (
        <Container to="/main/newdiary" onClick={() => dispatch(clear())}>
            <Plus size={30} />
            {"New Diary"}
        </Container>
    );
}
