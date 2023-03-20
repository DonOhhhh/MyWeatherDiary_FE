import styled from "@emotion/styled";

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
    return (
        <Container>
            <h1>일기가 없습니다.</h1>
        </Container>
    );
}
