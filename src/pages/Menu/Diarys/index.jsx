import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../../common/components/Spinner";
import { diaryClear, fetchDiaryGet, pageInc } from "./reducer/diarysSlice";
import axios from "axios";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    height: fit-content;
    position: relative;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    min-width: 400px;
    width: 40%;
    padding: 0;
`;

const CenteredBox = styled.div`
    width: 100%;
    text-align: center;
`;

export default function Diarys() {
    const diaryState = useSelector((state) => state.diarys);
    const loginState = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const observer = useRef();
    const lastPostRef = useRef();

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            // console.log(sessionStorage.getItem("username"));
            dispatch(fetchDiaryGet());
        }
    }, []);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    dispatch(fetchDiaryGet());
                }
            },
            {
                threshold: [1],
            }
        );

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }
    }, [diaryState.diarys]);

    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diaryState.diarys.length ? (
                    diaryState.diarys.map(
                        ({ id, postDate, emotion, contents }, i) => {
                            return i !== diaryState.diarys.length - 1 ? (
                                <CenteredBox key={i}>
                                    <Diary
                                        postId={id}
                                        postDate={postDate}
                                        emotion={emotion}
                                        contents={contents}
                                    />
                                    <hr
                                        style={{
                                            border: "0",
                                            borderTop: "1px dashed lightgray",
                                            width: "400px",
                                        }}
                                    />
                                </CenteredBox>
                            ) : (
                                <CenteredBox key={i} ref={lastPostRef}>
                                    <Diary
                                        postId={id}
                                        postDate={postDate}
                                        emotion={emotion}
                                        contents={contents}
                                    />
                                </CenteredBox>
                            );
                        }
                    )
                ) : (
                    <CenteredBox>일기가 없습니다</CenteredBox>
                )}
            </Container>
            {diaryState.loading && (
                <CenteredBox>
                    <Spinner />
                </CenteredBox>
            )}
        </Wrapper>
    );
}
