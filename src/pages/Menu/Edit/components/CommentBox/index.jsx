import styled from "@emotion/styled";

const StyledTextarea = styled.textarea`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 15px;
    font-family: Jua;
    font-size: 20px;
    font-weight: 400;
    overflow-y: scroll;
    scrollbar-width: thin;
    height: 100%;
    width: 100%;
    resize: none;
`;

function CommentBox({ form, field }) {
    return <StyledTextarea placeholder="some comments..." {...field} />;
}

export default CommentBox;
