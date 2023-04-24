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

export default function Diarys() {
    const diaryState = useSelector((state) => state.diarys);
    const dispatch = useDispatch();

    const observer = useRef();
    const lastPostRef = useRef();

    useEffect(() => {
        dispatch(fetchDiaryGet(diaryState.page));
    }, [diaryState.page]);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !diaryState.isEnd) {
                dispatch(pageInc());
            }
        });

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }
    }, [diaryState.diarys, diaryState.isEnd]);

    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diaryState.diarys.map(
                    ({ id, postDate, emotion, contents }, i) => {
                        return i !== diaryState.diarys.length - 1 ? (
                            <div key={i}>
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
                                    }}
                                />
                            </div>
                        ) : (
                            <div key={i} ref={lastPostRef}>
                                <Diary
                                    postId={id}
                                    postDate={postDate}
                                    emotion={emotion}
                                    contents={contents}
                                />
                            </div>
                        );
                    }
                )}
            </Container>
            {diaryState.loading && (
                <div style={{ width: "100%", textAlign: "center" }}>
                    <Spinner />
                </div>
            )}
        </Wrapper>
    );
}
