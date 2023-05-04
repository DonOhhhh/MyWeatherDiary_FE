import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as Yup from "yup";
import FormError from "../../../common/components/FormError";
import {
    diaryClear,
    fetchDiaryAdd,
    fetchDiaryGet,
    fetchDiaryUpdate,
} from "../Diarys/reducer/diarysSlice";
import DateBox from "./components/DateBox";
import EmotionBox from "./components/EmotionBox";
import DeleteBtn from "./components/DeleteBtn";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { clear } from "./reducer/editSlice";
import { Container, ContentArea, StyledTextArea } from "./components/Styled";
import Spinner from "../../../common/components/Spinner";
import Loading from "../../../common/components/Loading";
import { fetchCalendar } from "./../Activity/reducer/activitySlice";
import ImageBox from "./components/ImageBox";
import CommentBox from "./components/CommentBox";
import ContentsBox from "./components/ContentsBox";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin-top: 8%;
    gap: 15px;
    width: 95%;
    min-width: 400px;
    height: fit-content;
    max-height: calc(100vh - 200px);
    padding: 10px 30px;
    background-color: #d3eaff;
    position: relative;
    /* overflow: scroll;
    scrollbar-width: none; */
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
    gap: 10px;

    width: 100%;
    height: 100%;

    border: 1px dashed #898989;
    border-radius: 15px;
`;

const StyledBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: white;
    border-radius: 10px;
    font-size: 20px;
    padding: 4px 0;
    width: 100%;
    height: fit-content;

    font-family: "Jua";
    font-size: 24px;
    font-weight: 50;

    &:hover {
        cursor: pointer;
        background-color: #aaa;
    }
`;

const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    gap: 10px;
`;

function EditPage() {
    const pushRef = useRef(null);
    const initialValues = useSelector((state) => state.edit);
    const diaryState = useSelector((state) => state.diarys);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        dispatch(clear());
        dispatch(diaryClear());
        dispatch(
            location.pathname === "/main/newdiary"
                ? fetchDiaryAdd(values)
                : fetchDiaryUpdate(values)
        ).then((_) => navigate("/main/diarys"));
    };
    const validationSchema = Yup.object({
        postDate: Yup.date().required("날짜를 입력해주세요"),
        emotion: Yup.string()
            .oneOf(
                ["1", "2", "3", "4"],
                "Emotion must be one of the following: 1, 2, 3, or 4"
            )
            .required("Emotion is required"),
        contents: Yup.array()
            .min(1, "최소 1개 이상의 컨텐츠가 필요합니다.")
            .max(10, "최대 10개 이하로만 컨텐츠를 추가할 수 있습니다.")
            .of(
                Yup.object({
                    id: Yup.string()
                        .uuid()
                        .required("컨텐츠의 id가 필요합니다."),
                    img: Yup.string(),
                    comment: Yup.string(),
                })
            ),
    });
    const defaultContent = (id) => ({
        id,
        img: "",
        comment: "",
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ values }) => (
                <Wrapper>
                    {diaryState.loading && (
                        <Loading>
                            <Spinner size={50} />
                        </Loading>
                    )}
                    <StyledForm>
                        <RowBox style={{ height: "fit-content" }}>
                            <DateBox />
                            <EmotionBox emotion={values.emotion} />
                        </RowBox>
                        <div
                            style={{ width: "100%" }}
                        >{`컨텐츠 개수 : ${values.contents.length}`}</div>
                        <ContentArea style={{ maxHeight: "670px" }}>
                            <Container
                                role="group"
                                aria-labelledby="Content-box"
                            >
                                <FieldArray
                                    name="contents"
                                    render={(arrayHelpers) => (
                                        <ContentsBox
                                            arrayHelpers={arrayHelpers}
                                            pushRef={pushRef}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    name="contents"
                                    render={(msg) => (
                                        <FormError errorMessage={msg} />
                                    )}
                                />
                            </Container>
                        </ContentArea>
                        <Container
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "20px",
                            }}
                            role="group"
                            aria-labelledby="Button-box"
                        >
                            <StyledBtn
                                onClick={(e) => {
                                    e.preventDefault();
                                    pushRef.current(defaultContent(v4()));
                                }}
                            >
                                추가
                            </StyledBtn>
                            <StyledBtn
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (confirm("취소하시겠습니까?")) {
                                        navigate("/main/diarys");
                                    }
                                }}
                            >
                                취소
                            </StyledBtn>
                            <StyledBtn type="submit">작성</StyledBtn>
                        </Container>
                    </StyledForm>
                </Wrapper>
            )}
        </Formik>
    );
}

export default EditPage;
