import styled from "@emotion/styled";
import { Edit2, Trash2 } from "react-feather";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
    transform: translate(290px, 15px);
    margin-bottom: -100px;
`;

const UpdateBtn = styled(Edit2)`
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        stroke: red;
        cursor: pointer;
    }
`;

const DeleteBtn = styled(Trash2)`
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        stroke: red;
        cursor: pointer;
    }
`;

export default function ButtonGroup({ onUpdate, onDelete }) {
    return (
        <Container>
            <UpdateBtn
                size={40}
                strokeWidth={2}
                color="black"
                onClick={onUpdate}
            />
            <DeleteBtn
                size={40}
                strokeWidth={2}
                color="black"
                onClick={onDelete}
            />
        </Container>
    );
}
