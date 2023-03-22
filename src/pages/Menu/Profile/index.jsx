import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import axios from "axios";
import { Edit2, Edit3, Trash2, Unlock } from "react-feather";
import { Buffer } from "buffer";
import Bulb from "./icons/UserInfoIcons/bulb.svg";
import Email from "./icons/UserInfoIcons/email.svg";
import Work from "./icons/UserInfoIcons/work.svg";
import InfoItem from "./components/InfoItem";
import { ReactComponent as Facebook } from "./icons/UserLinks/Facebook.svg";
import { ReactComponent as Github } from "./icons/UserLinks/Github.svg";
import { ReactComponent as Twitter } from "./icons/UserLinks/Twitter.svg";
import { ReactComponent as Instagram } from "./icons/UserLinks/Instagram.svg";
import { Button } from "@mui/material";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const Center = styled.div`
    width: 40%;
    height: 100%;
    padding-top: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const Avatar = styled.div`
    display: inline-block;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    background-image: url(${({ src }) => src});
    background-size: cover;
`;

const Username = styled.div`
    display: inline-block;
    font-family: Inter;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
`;

const SNSIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    & svg:hover {
        & path {
            fill: black;
        }
        cursor: pointer;
    }
`;

const EditDeleteBtn = styled(Button)`
    border: 1px solid #ececec;
    border-radius: 10px;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    padding: 5px 10px;
`;

export default function Profile({ userId }) {
    const avatar = createAvatar(avataaars, {
        seed: "123412",
        size: 40,
        radius: 10,
        backgroundColor: ["D5D0E5", "F3E6E8"],
        backgroundType: ["gradientLinear"],
        backgroundRotation: [90],
    }).toString();
    const size = 30;

    return (
        <Container>
            <Center>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "40px",
                    }}
                >
                    <Avatar
                        src={
                            "data:image/svg+xml;base64," +
                            Buffer.from(avatar).toString("base64")
                        }
                        size="200px"
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            gap: "20px",
                        }}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <Username>{"ah73n9xl"}</Username>
                            <Username>{"님의 일기장"}</Username>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                                gap: "10px",
                            }}
                        >
                            <EditDeleteBtn
                                variant="outlined"
                                sx={{ color: "#6398eb" }}
                            >
                                <Edit3 />
                                {"Edit"}
                            </EditDeleteBtn>
                            <EditDeleteBtn
                                variant="outlined"
                                sx={{ color: "#dc7f86" }}
                            >
                                <Trash2 />
                                {"Delete"}
                            </EditDeleteBtn>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px",
                        width: "100%",
                    }}
                >
                    <InfoItem svgUrl={Bulb} text={"일기"} />
                    <InfoItem svgUrl={Email} text={"JohnDoe@gmail.com"} />
                    <InfoItem svgUrl={Work} text={"Developer"} />
                </div>
                <SNSIcons>
                    <Instagram width={size} height={size} />
                    <Facebook width={size} height={size} />
                    <Twitter width={size} height={size} />
                    <Github width={size} height={size} />
                </SNSIcons>
            </Center>
        </Container>
    );
}
