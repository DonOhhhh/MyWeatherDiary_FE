import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { getUser } from "../../../Menu/Profile/reducer/profileSlice";
import Spinner from "../../../../common/components/Spinner";
import { Skeleton } from "@mui/material";

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
    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.profile);
    const loginState = useSelector((state) => state.login);
    const avatarSize = 40;
    const avatar = createAvatar(avataaars, {
        seed: profileState.nickName,
        style: ["circle"],
        size: avatarSize,
        backgroundType: ["gradientLinear"],
        backgroundColor: ["D5D0E5", "F3E6E8"],
        backgroundRotation: [90],
    }).toString();

    useEffect(() => {
        if (!loginState.loading) {
            if (sessionStorage.getItem("token")) {
                dispatch(getUser());
            }
        }
    }, [loginState.token]);

    return (
        <Container>
            {profileState.loading || !profileState.nickName ? (
                <>
                    <Skeleton
                        variant="circular"
                        animation="wave"
                        width={avatarSize}
                        height={avatarSize}
                    />
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={200}
                        height={avatarSize}
                        sx={{ borderRadius: "15px" }}
                    />
                </>
            ) : (
                <>
                    <Avatar
                        src={
                            "data:image/svg+xml;base64," +
                            Buffer.from(avatar).toString("base64")
                        }
                    />
                    <Username>{profileState.nickName} 님</Username>
                </>
            )}
        </Container>
    );
}
