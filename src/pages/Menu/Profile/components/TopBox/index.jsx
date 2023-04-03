import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { Buffer } from "buffer";
import { Button } from "@mui/material";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-width: 350px;
    gap: 40px;
`;

const Avatar = styled.div`
    display: inline-block;
    width: 150px;
    height: 150px;
    background-image: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-size: contain;
`;

const UsernameBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Username = styled.div`
    display: inline-block;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    font-family: Jua;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
`;

const EditDeleteBtn = styled(Button)`
    border: 1px solid #ececec;
    border-radius: 10px;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    padding: 5px 10px;
`;

export default function TopBox({ username }) {
    const avatar = createAvatar(avataaars, {
        seed: username,
        size: 1000,
        radius: 10,
        backgroundColor: ["D5D0E5", "F3E6E8"],
        backgroundType: ["gradientLinear"],
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
            <UsernameBox>
                <Username>{username}</Username>
                <Username>{"님의 일기장"}</Username>
            </UsernameBox>
        </Container>
    );
}
