import { ReactComponent as Facebook } from "../../icons/UserLinks/Facebook.svg";
import { ReactComponent as Github } from "../../icons/UserLinks/Github.svg";
import { ReactComponent as Twitter } from "../../icons/UserLinks/Twitter.svg";
import { ReactComponent as Instagram } from "../../icons/UserLinks/Instagram.svg";
import styled from "@emotion/styled";

const SNSIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    min-width: 350px;
    height: 30px;
    & svg:hover {
        & path {
            fill: black;
        }
        cursor: pointer;
    }
`;

export default function BottomBox({ sns }) {
    // const { instagram, facebook, twitter, github } = sns;
    const size = 30;
    return (
        <SNSIcons>
            <Instagram width={size} height={size} />
            <Facebook width={size} height={size} />
            <Twitter width={size} height={size} />
            <Github width={size} height={size} />
        </SNSIcons>
    );
}
