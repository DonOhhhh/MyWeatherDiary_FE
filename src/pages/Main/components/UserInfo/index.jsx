import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Buffer } from "buffer";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const Username = styled.div`
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-family: Jua;
    font-size: 24px;
`;

const Avatar = styled.div`
    display: inline-block;
    width: ${({ size }) => (size ? size : "40px")};
    height: ${({ size }) => (size ? size : "40px")};
    background-image: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-size: contain;
`;

export default function UserInfo() {
    const { username } = useSelector((state) => state.profile);
    const avatar = createAvatar(avataaars, {
        seed: username,
        style: ["circle"],
        size: 60,
        backgroundType: ["gradientLinear"],
        backgroundColor: ["D5D0E5", "F3E6E8"],
        backgroundRotation: [90],
    }).toString();
    return (
        <Container>
            <Avatar
                src={
                    "data:image/svg+xml;base64," +
                    Buffer.from(avatar).toString("base64")
                }
            />
            <Username>{username} 님</Username>
        </Container>
    );
}