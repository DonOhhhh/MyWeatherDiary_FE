import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../../common/components/Spinner";
import { diaryClear, fetchDiaryGet, incPage } from "./reducer/diarysSlice";
import axios from "axios";
import { Skeleton } from "@mui/material";
import DiarySkeleton from "./components/Diary/components/DiarySkeleton";
import { source } from "../../../main";

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
    width: 400px;
    padding: 0;
`;

const CenteredBox = styled.div`
    width: 100%;
    text-align: center;
`;

export default function Diarys() {
    const diaryState = useSelector((state) => state.diarys);
    const dispatch = useDispatch();

    const observer = useRef();
    const lastPostRef = useRef();

    useEffect(() => {
        console.log("mounted!");
        return () => {
            console.log("unmounted!");
            // source.cancel("fetchDiaryGet cancelled");
        };
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            // console.log(sessionStorage.getItem("username"));
            dispatch(fetchDiaryGet());
        }
    }, [diaryState.page]);

    useEffect(() => {
        if (diaryState.loading) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !diaryState.isEnd) {
                    dispatch(incPage());
                }
            },
            {
                threshold: [1],
            }
        );

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [diaryState.diarys]);

    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diaryState.loading && diaryState.diarys.length === 0 ? (
                    <CenteredBox>
                        <DiarySkeleton />
                    </CenteredBox>
                ) : (
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
                )}
            </Container>
            {diaryState.loading && diaryState.diarys.length > 0 && (
                <CenteredBox>
                    <Spinner size={50} />
                </CenteredBox>
            )}
            {!diaryState.loading && diaryState.diarys.length === 0 && (
                <CenteredBox>일기가 존재하지 않습니다.</CenteredBox>
            )}
        </Wrapper>
    );
}
