import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as Yup from "yup";
import FormError from "../../../common/components/FormError";
import {
    diaryAdd,
    diaryUpdate,
    fetchDiaryAdd,
} from "../Diarys/reducer/diarysSlice";
import DateBox from "./components/DateBox";
import EmotionBox from "./components/EmotionBox";
import DeleteBtn from "./components/DeleteBtn";
import styled from "@emotion/styled";
import Container from "./components/EditContainer";
import ImageBox from "./components/ImageBox";
import { useEffect } from "react";
import { clear } from "./reducer/editSlice";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    width: 40%;
    min-width: 400px;
    height: fit-content;
    padding: 30px 30px;
    background-color: #d3eaff;
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

function EditPage() {
    const initialValues = useSelector((state) => state.edit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(
            location.pathname === "/main/newdiary"
                ? dispatch(fetchDiaryAdd(values))
                : diaryUpdate(values)
        );
        navigate("/main/diarys");
    };
    const validationSchema = Yup.object({
        date: Yup.date().required("날짜를 입력해주세요"),
        emotion: Yup.string().required("Emotion Required"),
        contents: Yup.array().min(1, "최소 1개 이상의 일기가 필요합니다."),
    });
    const defaultContent = (id) => ({
        id,
        imgSrc: "",
        comment: "",
    });
    let pushFunction;

    useEffect(() => {
        dispatch(clear());
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
        >
            {({ values }) => (
                <Wrapper>
                    <StyledForm>
                        <DateBox />
                        <EmotionBox emotion={values.emotion} />
                        <Container role="group" aria-labelledby="Content-box">
                            <FieldArray name="contents">
                                {(fieldArrayProps) => {
                                    const { remove, push, form } =
                                        fieldArrayProps;
                                    pushFunction = push;
                                    const { contents } = form.values;
                                    return (
                                        <>
                                            {contents.map((_, index) => (
                                                <StyledContent key={index}>
                                                    <DeleteBtn
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    />
                                                    <Field
                                                        name={`contents[${index}].imgSrc`}
                                                        component={ImageBox}
                                                    />
                                                    <Field
                                                        as="textarea"
                                                        placeholder="some comments..."
                                                        name={`contents[${index}].comment`}
                                                        style={{
                                                            padding: "15px",
                                                            border: "1px solid #ddd",
                                                            borderRadius:
                                                                "15px",
                                                            fontFamily: "Jua",
                                                            fontSize: "20px",
                                                            fontWeight: "400",
                                                            overflow: "scroll",
                                                            height: "200px",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </StyledContent>
                                            ))}
                                        </>
                                    );
                                }}
                            </FieldArray>
                            <ErrorMessage
                                name="contents"
                                component={FormError}
                            />
                        </Container>
                        <Container
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "16px 10px",
                                gap: "20px",
                            }}
                            role="group"
                            aria-labelledby="Button-box"
                        >
                            <StyledBtn
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    pushFunction(defaultContent(v4()));
                                }}
                            >
                                추가
                            </StyledBtn>
                            <StyledBtn
                                type="submit"
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
