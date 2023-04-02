import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { diaryImport } from "../../../Edit/reducer/editSlice";
import { diaryDelete } from "../../reducer/diarysSlice";
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
    height: auto;

    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 15px;
`;

export default function Diary({ postId, date, emotion, contents }) {
    const [contentNum, setContentNum] = useState(0);
    const { imgSrc, comment } = contents[contentNum];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Wrapper>
            <ButtonGroup
                onUpdate={() => {
                    dispatch(
                        diaryImport({ id: postId, date, emotion, contents })
                    );
                    navigate("/main/edit");
                }}
                onDelete={() => {
                    if (confirm("삭제하시겠습니까?")) {
                        dispatch(diaryDelete({ postId }));
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
                {imgSrc && <Divider sx={{ border: "1px solid #e0e0e0" }} />}
                {imgSrc && <ImageBox imgSrc={imgSrc} />}
                {comment && <Divider sx={{ border: "1px solid #e0e0e0" }} />}
                {comment && <CommentBox comment={comment} />}
            </Container>
        </Wrapper>
    );
}
