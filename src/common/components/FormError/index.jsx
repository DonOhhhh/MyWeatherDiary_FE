import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
    text-align: start;
    height: fit-content;
    color: red;
    padding-left: 10px;
`;

export default function FormError({ children, ...props }) {
    return <Container {...props}>{children}</Container>;
}
