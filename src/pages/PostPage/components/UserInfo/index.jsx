import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import axios from "axios";
import { Edit2, Unlock } from "react-feather";
import { Buffer } from "buffer";
import Bulb from "../../icons/UserInfoIcons/bulb.svg";
import Email from "../../icons/UserInfoIcons/email.svg";
import Work from "../../icons/UserInfoIcons/work.svg";
import InfoItem from "./InfoItem";
import { ReactComponent as Facebook } from "../../icons/UserLinks/Facebook.svg";
import { ReactComponent as Github } from "../../icons/UserLinks/Github.svg";
import { ReactComponent as Twitter } from "../../icons/UserLinks/Twitter.svg";
import { ReactComponent as Instagram } from "../../icons/UserLinks/Instagram.svg";

const getUserInfo = async (userId) => {
    return await axios.post("/user", {
        userId,
    });
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        269.57deg,
        #daedff -14.06%,
        rgba(218, 237, 255, 0) 134.86%
    );
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: flex-start; */
`;

const ManagedIconBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px 0 25px 0;
    padding: 0 10px;
    gap: 10px;
    & svg:hover {
        & path,
        & rect {
            stroke: black;
        }
        cursor: pointer;
    }
`;

const Avatar = styled.div`
    display: inline-block;
    width: 120px;
    height: 120px;
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
    justify-content: space-evenly;
    gap: 47px;
    margin: 37px 80px;
    height: 30px;
    & svg:hover {
        & path {
            fill: black;
        }
        cursor: pointer;
    }
`;

export default function UserInfo({ userId }) {
    const avatar = createAvatar(avataaars, {
        seed: "123412",
        size: 40,
        radius: 50,
    }).toString();
    const size = 30;

    return (
        <Container>
            <ManagedIconBox>
                <Unlock size={30} color="gray" />
                <Edit2 size={30} color="gray" />
            </ManagedIconBox>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <Avatar
                    src={
                        "data:image/svg+xml;base64," +
                        Buffer.from(avatar).toString("base64")
                    }
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Username>{"ah73n9xl"}</Username>
                    <Username>{"님의 일기장"}</Username>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "40px",
                    gap: "15px",
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
        </Container>
    );
}
