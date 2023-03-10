import styled from "@emotion/styled";
import { Form } from "react-router-dom";

import { useOverlay } from "../../../Context/OverlayProvider";
import { v4 } from "uuid";
import ContentBox from "../../ContentBox";
import useSessionStorage from "../../../hooks/useSessionStorage";
import { useCallback, useEffect } from "react";
import EmotionSelectBox from "./EmotionSelectBox";
import { debounce } from "lodash";

const StyledForm = styled(Form)`
    position: relative;
    top: 0px;
    /* left: 0px; */
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin: 0;
    padding: 45px 30px;
    gap: 15px;
    border-width: 5px 0px 5px 5px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 15px 0px 0px 15px;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 10px;
    margin: 0;
    gap: 20px;

    width: 100%;
    height: auto;

    border: 1px solid #ffffff;
    border-radius: 15px;
`;

const Question = styled.div`
    width: 100%;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 15px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Inter";
    font-weight: 700;
    font-size: 16px;
`;

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: 16px 10px;
    margin: 0;
    gap: 20px;

    width: 100%;

    border: 1px solid #ffffff;
    border-radius: 15px;
`;

const Button = styled.button`
    display: flex;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;

    font-family: "Inter";
    font-weight: 700;
    font-size: 16px;
    &:hover {
        background-color: #aaaaaa;
        cursor: pointer;
    }
`;

const InputDate = styled.input`
    width: 100%;
    text-align: center;

    border: 1px solid #000000;
    border-radius: 15px;
    outline: none;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    gap: 20px;
`;

export async function action({ request, params }) {
    const formData = await request.formData();
    const dataObj = Object.fromEntries(formData);
    console.log(dataObj);
    return dataObj;
}

const InitialData = (id) => ({
    date: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10),
    emotion: "good",
    contents: [
        {
            id,
            imgSrc: "",
            comment: "",
        },
    ],
});

export default function AddPost() {
    const { closeOverlay, diarys, setDiarys } = useOverlay();
    const [tmpDiary, setTmpDiary] = useSessionStorage(
        "tmpDiary",
        InitialData(v4())
    );

    useEffect(() => {
        sessionStorage.getItem("tmpDiary") === null && setTmpDiary(tmpDiary);
        sessionStorage.getItem("diarys") === null && setDiarys(diarys);
    }, [diarys, setDiarys, setTmpDiary, tmpDiary]);

    // console.log(tmpDiary.contents.forEach(({ id }) => console.log(id)));

    const addContents = useCallback(() => {
        setTmpDiary({
            ...tmpDiary,
            contents: [
                ...tmpDiary.contents,
                {
                    id: v4(),
                    imgSrc: "",
                    comment: "",
                },
            ],
        });
    }, [setTmpDiary, tmpDiary]);

    const updateContents = useCallback(
        (id, imgSrc, comment) => {
            setTmpDiary({
                ...tmpDiary,
                contents: tmpDiary.contents.map((e) =>
                    e.id === id ? { id, imgSrc, comment } : e
                ),
            });
        },
        [setTmpDiary, tmpDiary]
    );

    const updateContentDelay = useCallback(debounce(updateContents, 5000), [
        updateContents,
    ]);

    const deleteContent = useCallback(
        (id) => {
            tmpDiary.contents.length === 1
                ? alert("??? ??? ????????? ???????????? ????????? ???????????????.")
                : setTmpDiary({
                      ...tmpDiary,
                      contents: tmpDiary.contents.filter((e) => e.id !== id),
                  });
        },
        [tmpDiary, setTmpDiary]
    );

    return (
        <StyledForm
            method="post"
            onSubmit={async (e) => {
                e.preventDefault();
                // ????????? ?????? ??? ?????? ?????????
                // ?????? debounce ????????? ??? ???????????? ????????? ????????? ?????? textarea??? ?????? ?????? tmpDiary??? ????????? ???. ??????????
                const { target } = e;
                if (!(target[`image0`].value || target[`comment0`].value)) {
                    alert(
                        "????????? ?????? ??? ????????? ????????? 1??? ?????? ??????????????? ?????????."
                    );
                    return;
                }
                // debounce??? ????????????
                updateContentDelay.cancel();
                for (
                    let i = 0,
                        imgSrc = target[`image${i}`].value,
                        comment = target[`comment${i}`].value;
                    imgSrc || comment;
                    i++,
                        imgSrc = target[`image${i}`]?.value,
                        comment = target[`comment${i}`]?.value
                ) {
                    updateContents(i, imgSrc, comment);
                    console.log(imgSrc, comment);
                }
                setDiarys([...diarys, tmpDiary]);
                setTmpDiary(InitialData(v4()));
                closeOverlay();
            }}
        >
            <InputBox>
                <Question>????????? ??????????????????.</Question>
                <InputDate
                    type="date"
                    name="date"
                    defaultValue={tmpDiary.date}
                    onChange={(e) => {
                        setTmpDiary({ ...tmpDiary, date: e.target.value });
                    }}
                    required
                />
            </InputBox>
            <InputBox>
                <Question>????????? ??????????????????.</Question>
                <EmotionSelectBox
                    tmpDiary={tmpDiary}
                    setTmpDiary={setTmpDiary}
                />
            </InputBox>
            <InputBox>
                <Question>?????? ?????? ?????? ????????? ?????????????</Question>
                <Contents>
                    {tmpDiary.contents.map(({ id, imgSrc, comment }, index) => {
                        // console.log(id, imgSrc, comment);
                        return (
                            <ContentBox
                                key={v4()}
                                index={index}
                                contentId={id}
                                imgSrc={imgSrc}
                                comment={comment}
                                onChanged={updateContents}
                                onCommentChange={updateContentDelay}
                                onDelete={deleteContent}
                            />
                        );
                    })}
                </Contents>
            </InputBox>
            <BtnBox>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        if (tmpDiary.contents.length <= 10) addContents();
                        else alert("????????? 10???????????? ?????? ???????????????.");
                    }}
                >
                    ??????
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        const res = window.confirm("????????? ?????????????????????????");
                        if (res) {
                            closeOverlay();
                            setTmpDiary(InitialData(v4()));
                        }
                    }}
                >
                    ??????
                </Button>
                <Button type="submit">??????</Button>
            </BtnBox>
        </StyledForm>
    );
}
