import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
    height: fit-content;
    color: red;
    padding-left: 10px;
`;

export default function FormError({ errorMessage }) {
    return <Container>{errorMessage}</Container>;
}
