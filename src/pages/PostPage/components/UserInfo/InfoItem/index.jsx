import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 3px solid black;
    stroke-linecap: round;
    padding: 5px 0;
`;

const HeadIcon = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(${({ svgUrl }) => svgUrl});
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    font-family: "Jua";
    font-size: 20px;
    font-weight: 400;
`;

export default function InfoItem({ svgUrl, text }) {
    return (
        <Container>
            <HeadIcon svgUrl={svgUrl}></HeadIcon>
            <Text>{text} </Text>
        </Container>
    );
}
