import styled from "@emotion/styled";
import axios from "axios";
import { Edit2 } from "feather-icons";

const getUserInfo = async (userId) => {
    return await axios.post("/user", {
        userId,
    });
};

const EditBtn = styled(Edit2)`
    fill: lightgray;
    stroke: lightgray;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const ManagedIconBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 25px;
    padding: 0;
    gap: 10px;
`;

export default function UserInfo({ userId }) {
    return (
        <Container>
            <ManagedIconBox>{/* <EditBtn /> */}</ManagedIconBox>
        </Container>
    );
}
