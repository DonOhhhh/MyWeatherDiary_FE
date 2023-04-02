import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    padding: 10px;
    gap: 10px;
    width: 100%;
    height: fit-content;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    border-radius: 15px;

    font-family: "Jua";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 40px;
    word-break: break-all;
`;

export default function CommentBox({ comment }) {
    return <Container>{comment}</Container>;
}
