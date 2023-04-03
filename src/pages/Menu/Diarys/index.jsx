import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Diary from "./components/Diary";

const Wrapper = styled.div`
    display: flex;
    /* min-width: 600px; */
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 580px;
    width: 40%;
    padding: 0;
`;

export default function Diarys() {
    const diarys = useSelector((state) => state.diarys);
    return (
        <Wrapper>
            <Container>
                {diarys.length ? (
                    diarys.map(({ id, date, emotion, contents }, i) => (
                        <div key={i}>
                            <Diary
                                postId={id}
                                date={date}
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
                    <div>일기가 없습니다</div>
                )}
            </Container>
        </Wrapper>
    );
}
