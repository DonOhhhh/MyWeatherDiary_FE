import styled from "@emotion/styled";

const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    min-height: 600px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 15px;

    background-image: url(${({ src }) => src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

export default function ImageBox({ imgSrc }) {
    return <Image src={imgSrc} />;
}
