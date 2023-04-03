import styled from "@emotion/styled";
import Bulb from "../../icons/UserInfoIcons/bulb.svg";
import Email from "../../icons/UserInfoIcons/email.svg";
import Work from "../../icons/UserInfoIcons/work.svg";
import InfoItem from "../../components/InfoItem";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 70%;
    min-width: 350px;
`;

export default function MiddleBox({ middleBoxInfo }) {
    const { diaryTitle, email, job } = middleBoxInfo;
    return (
        <Container>
            <InfoItem svgUrl={Bulb} text={diaryTitle} />
            <InfoItem svgUrl={Email} text={email} />
            <InfoItem svgUrl={Work} text={job} />
        </Container>
    );
}
