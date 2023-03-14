import Post from "../../Post";
import Divider from "../../Divider";
import styled from "@emotion/styled";
import { useOverlay } from "../../../Context/OverlayProvider";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* min-width: 600px; */
    width: 100%;
    min-height: 1000px;
    padding: 0;
    gap: 20px;
`;

export default function PostSection() {
    const { diarys } = useOverlay();
    return (
        <Container>
            {diarys.length ? (
                diarys
                    .sort((a, b) => (b.date > a.date ? 1 : -1))
                    .map(({ date, emotion, contents }, i) => (
                        <div key={i}>
                            <Post
                                postId={i}
                                date={date}
                                emotion={emotion}
                                contents={contents}
                            />
                            {i !== diarys.length - 1 ? (
                                <Divider
                                    lineColor="lightgray"
                                    lineStyle="dashed"
                                />
                            ) : null}
                        </div>
                    ))
            ) : (
                <h1>일기가 없습니다.</h1>
            )}
        </Container>
    );
}
