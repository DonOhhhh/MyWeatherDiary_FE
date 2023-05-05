import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { Buffer } from "buffer";
import { Button, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";

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
    gap: 20px;
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

export default function TopBox({ username }) {
    const avatar = createAvatar(avataaars, {
        seed: username,
        size: 1000,
        radius: 10,
        backgroundColor: ["D5D0E5", "F3E6E8"],
        backgroundType: ["gradientLinear"],
        backgroundRotation: [90],
    }).toString();
    const { loading } = useSelector((state) => state.profile);

    return (
        <Container>
            {loading ? (
                <>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "10px",
                        }}
                    />
                    <UsernameBox>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{
                                width: "200px",
                                height: "40px",
                                borderRadius: "10px",
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            sx={{
                                width: "100px",
                                height: "40px",
                                borderRadius: "10px",
                            }}
                        />
                    </UsernameBox>
                </>
            ) : (
                <>
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
                </>
            )}
        </Container>
    );
}
