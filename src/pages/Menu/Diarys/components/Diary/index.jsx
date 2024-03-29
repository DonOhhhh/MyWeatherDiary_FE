import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { diaryImport } from "../../../Edit/reducer/editSlice";
import {
    diaryClear,
    fetchDiaryDelete,
    fetchDiaryGet,
} from "../../reducer/diarysSlice";
import ButtonGroup from "./components/ButtonGroup";
import CommentBox from "./components/CommentBox";
import ImageBox from "./components/ImageBox";
import Pagination from "./components/Pagination";
import TopBox from "./components/TopBox";
import Spinner from "../../../../../common/components/Spinner";
import axios from "axios";

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
    max-width: 400px;
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

function Diary({ postId, postDate, emotion, contents }) {
    const [num, setNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const [postContents, setPostContents] = useState(
        contents.slice().sort((a, b) => a.contentOrder - b.contentOrder)
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchContentsImg = async () => {
    //         try {
    //             setLoading(true);
    //             const results = await Promise.all(
    //                 contents.map(({ id }) =>
    //                     axios.get("" + `/diary/content/${id}`)
    //                 )
    //             );
    //             const data = results.map((result, i) => ({
    //                 id: contents[i].id,
    //                 img: result.data.data,
    //                 comment: contents[i].comment,
    //             }));
    //             console.log("fetchContentsImg");
    //             console.log(data);
    //             setPostContents(data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchContentsImg();
    // }, [contents]);
    return (
        <Wrapper>
            <ButtonGroup
                onUpdate={() => {
                    dispatch(
                        diaryImport({
                            id: postId,
                            postDate,
                            emotion: EmotionToNum[emotion],
                            contents: postContents,
                        })
                    );
                    navigate("/main/edit");
                }}
                onDelete={() => {
                    if (confirm("삭제하시겠습니까?")) {
                        dispatch(fetchDiaryDelete(postId)).then((state) => {
                            const { payload } = state;
                            if (payload.statusCode === 200) {
                                console.log("DiaryDeleted!");
                                dispatch(diaryClear());
                                dispatch(fetchDiaryGet());
                            }
                        });
                    }
                }}
            />
            <Container id={postId}>
                <TopBox emotion={emotion} postDate={postDate} />
                <Divider sx={{ border: "1px solid #e0e0e0" }} />
                <Pagination
                    page={num}
                    onClick={setNum}
                    length={contents.length}
                />
                {loading && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <Spinner size={50} />
                    </div>
                )}
                {postContents[num]?.img && (
                    <Divider sx={{ border: "1px solid #e0e0e0" }} />
                )}
                {postContents[num]?.img && (
                    <ImageBox imgSrc={postContents[num].img} />
                )}
                {postContents[num]?.comment && (
                    <Divider sx={{ border: "1px solid #e0e0e0" }} />
                )}
                {postContents[num]?.comment && (
                    <CommentBox comment={postContents[num].comment} />
                )}
            </Container>
        </Wrapper>
    );
}

function areEqual(prevProps, nextProps) {
    return prevProps.postId === nextProps.postId;
}

export default React.memo(Diary, areEqual);
