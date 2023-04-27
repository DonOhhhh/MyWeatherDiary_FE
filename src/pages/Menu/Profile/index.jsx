import styled from "@emotion/styled";
import axios from "axios";

import TopBox from "./components/TopBox";
import MiddleBox from "./components/MiddleBox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateProfile } from "./reducer/profileSlice";
import UpdateBox from "./components/UpdateBox";
import BottomBox from "./components/BottomBox";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../Home/reducer/loginSlice";
import { diaryClear } from "../Diarys/reducer/diarysSlice";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: fit-content;
    width: 100%;
    position: relative;
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

    const profile = useSelector((state) => state.profile);
    const { nickName, diaryTitle } = profile;

    const handleUpdate = () => {
        navigate("/main/profileedit");
    };

    const handleDelete = () => {
        if (confirm("일기장을 삭제하시겠습니까?")) {
            dispatch(deleteUser()).then((state) => {
                dispatch(clearToken());
                dispatch(diaryClear());
                navigate("/");
            });
        }
    };

    return (
        <Container>
            <Center>
                <TopBox username={nickName} />
                <MiddleBox middleBoxInfo={{ diaryTitle }} />
                {/* <BottomBox sns={sns} /> */}
                <UpdateBox onUpdate={handleUpdate} onDelete={handleDelete} />
            </Center>
        </Container>
    );
}
