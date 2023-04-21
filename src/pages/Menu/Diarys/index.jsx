import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useEffect, useState } from "react";
import { getTimeline } from "./reducer/diarysSlice";
import axios from "axios";
import { useApi } from "../../../common/hooks/useApi";
import { setToken } from "../../Home/reducer/loginSlice";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh);
    height: fit-content;
    position: relative;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 400px;
    width: 40%;
    padding: 0;
`;

export default function Diarys() {
    const [page, setPage] = useState(0);
    const diaryState = useSelector((state) => state.diarys);
    const dispatch = useDispatch();
    const diarys = diaryState.diarys.slice();
    const loginState = useSelector((state) => state.login);
    useEffect(() => {
        if (loginState.token) {
            dispatch(getTimeline());
        }
    }, [loginState.token]);
    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diarys.length ? (
                    diarys
                        .sort(
                            (a, b) =>
                                new Date(b.postDate) - new Date(a.postDate)
                        )
                        .map(({ id, postDate, emotion, contents }, i) => (
                            <div key={i}>
                                <Diary
                                    postId={id}
                                    date={postDate}
                                    emotion={emotion}
                                    contents={contents}
                                />
                                {i !== diarys.length - 1 ? (
                                    <hr
                                        style={{
                                            border: "0",
                                            borderTop: "1px dashed lightgray",
                                        }}
                                    />
                                ) : null}
                            </div>
                        ))
                ) : (
                    <div>일기가 존재하지 않습니다.</div>
                )}
            </Container>
        </Wrapper>
    );
}
