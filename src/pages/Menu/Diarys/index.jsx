import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../../common/components/Spinner";
import { diaryClear, fetchDiaryGet, incPage } from "./reducer/diarysSlice";
import DiarySkeleton from "./components/Diary/components/DiarySkeleton";
import EndOfDiary from "./components/EndOfDiary";
import { fetchDiaryGetRef } from "./../../../main";

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
    const [hasMounted, setHasMounted] = useState(false);

    const observer = useRef();
    const lastPostRef = useRef();

    useEffect(() => {
        console.log("Diarys mounted!");
        return () => {
            console.log("Diarys unmounted! and fetchDiaryGet aborted!");
            diaryState.loading && fetchDiaryGetRef.current.abort();
        };
    }, []);

    useEffect(() => {
        /*
        일기장이 아직 남아있지만 일기를 다 로드하지 않은 경우 다른 페이지로 넘어갔다가 와도 그 상태 그대로 유지되고 마지막 요소가 다 보이면 로딩도 잘 되게끔 하는 거
        1) 일기장을 처음 로드했을 경우
            isEnd : false, page: 0, ref: null, diarys.length: 0, 다음페이지 로드 가능, 마운트시 로드 O
        2) 일기장을 로드했었지만 끝까지 로드하진 않았을 경우
            isEnd : false, page: n, ref: promise, diarys.length: not 0, 다음페이지 로드 가능, 마운트시 로드 X
        3) 일기장을 로드했었고 끝까지 로드한 경우
            isEnd: true, page: n, ref: promise, diarys.length: not 0, 다음페이지 로드 불가능, 마운트시 로드 X
        */
        console.log(
            `isEnd: ${diaryState.isEnd}, fetchDiaryGetRef: ${fetchDiaryGetRef.current}, hasMounted: ${hasMounted}`
        );
        if (!diaryState.isEnd) {
            // 마운트시
            if (!hasMounted) {
                if (fetchDiaryGetRef.current === null) {
                    fetchDiaryGetRef.current = dispatch(fetchDiaryGet());
                }
                setHasMounted(true);
            }
            // 다음 페이지 로드시
            else {
                fetchDiaryGetRef.current = dispatch(fetchDiaryGet());
            }
        }
    }, [diaryState.page]);

    useEffect(() => {
        if (diaryState.loading) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !diaryState.isEnd) {
                    console.log("page increased!");
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
    }, [diaryState.diarys, diaryState.isEnd]);

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
                {diaryState.diarys.length && diaryState.isEnd ? (
                    <EndOfDiary />
                ) : null}
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
