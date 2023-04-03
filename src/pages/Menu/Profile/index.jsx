import styled from "@emotion/styled";
import axios from "axios";

import TopBox from "./components/TopBox";
import MiddleBox from "./components/MiddleBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "./reducer/profileSlice";
import UpdateBox from "./components/UpdateBox";
import BottomBox from "./components/BottomBox";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const Center = styled.div`
    width: 35%;
    height: 100%;
    padding-top: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     dispatch(
    //         updateProfile({
    //             username: "aaaa",
    //             diaryTitle: "음식일기",
    //             email: "johndoe@gmail.com",
    //         })
    //     );
    // }, []);

    const profile = useSelector((state) => state.profile);

    const { username } = profile;
    const { diaryTitle, email, job } = profile;
    const { sns } = profile;

    const handleUpdate = () => {
        navigate("/main/profileedit");
    };

    const handleDelete = () => {
        console.log("delete");
    };

    return (
        <Container>
            <Center>
                <TopBox username={username} />
                <MiddleBox middleBoxInfo={{ diaryTitle, email, job }} />
                <BottomBox sns={sns} />
                <UpdateBox onUpdate={handleUpdate} onDelete={handleDelete} />
            </Center>
        </Container>
    );
}
