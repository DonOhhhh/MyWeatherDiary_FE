import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useEffect, useState } from "react";
import { getTimeline } from "./reducer/diarysSlice";
import axios from "axios";
import { useApi } from "../../../common/hooks/useApi";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 20px;
    min-height: calc(100vh-20px);
    height: fit-content;
    /* min-width: 600px; */
    position: relative;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 580px;
    width: 40%;
    padding: 0;
`;

export default function Diarys() {
    const [page, setPage] = useState(0);
    const state = useSelector((state) => state.diarys);
    const dispatch = useDispatch();
    const diarys = state.diarys.slice();
    // useEffect(() => {
    //     dispatch(getTimeline());
    // }, []);
    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diarys.length ? (
                    diarys
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
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
