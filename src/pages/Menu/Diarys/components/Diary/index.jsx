import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { diaryImport } from "../../../Edit/reducer/editSlice";
import { fetchDiaryDelete, fetchDiaryGet } from "../../reducer/diarysSlice";
import ButtonGroup from "./components/ButtonGroup";
import CommentBox from "./components/CommentBox";
import ImageBox from "./components/ImageBox";
import Pagination from "./components/Pagination";
import TopBox from "./components/TopBox";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 10px;
    margin: 10px 0;

    width: 100%;
    min-width: 400px;
    height: auto;

    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 15px;
`;

const EmotionToNum = {
    HAPPY: "1",
    SAD: "2",
    NEUTRAL: "3",
    ANGER: "4",
};

export default function Diary({ postId, date, emotion, contents }) {
    const [contentNum, setContentNum] = useState(0);
    const { img, comment } = contents.length && contents[contentNum];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Wrapper>
            <ButtonGroup
                onUpdate={() => {
                    dispatch(
                        diaryImport({
                            id: postId,
                            postDate: new Date(date.slice(0, 3).join("-")),
                            emotion: EmotionToNum[emotion],
                            contents,
                        })
                    );
                    navigate("/main/edit");
                }}
                onDelete={() => {
                    if (confirm("삭제하시겠습니까?")) {
                        dispatch(fetchDiaryDelete(postId)).then((data) =>
                            dispatch(fetchDiaryGet())
                        );
                    }
                }}
            />
            <Container id={postId}>
                <TopBox emotion={emotion} date={date} />
                <Divider sx={{ border: "1px solid #e0e0e0" }} />
                <Pagination
                    page={contentNum}
                    onClick={setContentNum}
                    length={contents.length}
                />
                {img && <Divider sx={{ border: "1px solid #e0e0e0" }} />}
                {img && <ImageBox imgSrc={img} />}
                {comment && <Divider sx={{ border: "1px solid #e0e0e0" }} />}
                {comment && <CommentBox comment={comment} />}
            </Container>
        </Wrapper>
    );
}
