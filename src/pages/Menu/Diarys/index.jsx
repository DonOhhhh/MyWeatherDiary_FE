import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";
import { useEffect, useState } from "react";
import Spinner from "../../../common/components/Spinner";
import { fetchDiaryGet } from "./reducer/diarysSlice";

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
    const [diarys, setDiarys] = useState([]);
    const diaryState = useSelector((state) => state.diarys);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDiaryGet());
    }, []);

    useEffect(() => {
        if (!diaryState.loading && diaryState.diarys.length) {
            setDiarys(diaryState.diarys.slice());
        }
    }, [diaryState.loading, diaryState.diarys]);
    return (
        <Wrapper>
            <NewDiary />
            <Container>
                {diaryState.loading ? (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spinner />
                    </div>
                ) : diarys.length ? (
                    diarys.map(({ id, postDate, emotion, contents }, i) => (
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
