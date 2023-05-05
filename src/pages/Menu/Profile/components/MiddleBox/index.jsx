import styled from "@emotion/styled";
import Bulb from "../../icons/UserInfoIcons/bulb.svg";
import Email from "../../icons/UserInfoIcons/email.svg";
import Work from "../../icons/UserInfoIcons/work.svg";
import InfoItem from "../../components/InfoItem";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

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
    const { loading } = useSelector((state) => state.profile);
    return (
        <Container>
            {loading ? (
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{ width: "100%", height: "40px", borderRadius: "10px" }}
                />
            ) : (
                <>
                    <InfoItem svgUrl={Bulb} text={diaryTitle} />
                </>
            )}

            {/* {email && <InfoItem svgUrl={Email} text={email} />} */}
            {/* {job && <InfoItem svgUrl={Work} text={job} />} */}
        </Container>
    );
}
