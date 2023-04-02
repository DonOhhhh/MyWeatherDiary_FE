import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useState } from "react";
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
    gap: 5px;
    padding: 10px;
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
    return (
        <Wrapper>
            <Container id={postId}>
                <TopBox emotion={emotion} date={date} />
                <Divider
                    variant="middle"
                    sx={{ border: "1px solid #e0e0e0" }}
                />
                <Pagination
                    page={contentNum}
                    onClick={setContentNum}
                    length={contents.length}
                />
                {imgSrc && (
                    <Divider
                        variant="middle"
                        sx={{ border: "1px solid #e0e0e0" }}
                    />
                )}
                {imgSrc && <ImageBox imgSrc={imgSrc} />}
                {comment && (
                    <Divider
                        variant="middle"
                        sx={{ border: "1px solid #e0e0e0" }}
                    />
                )}
                {comment && <CommentBox comment={comment} />}
            </Container>
        </Wrapper>
    );
}
