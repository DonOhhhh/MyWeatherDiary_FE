import { Link, useLoaderData } from "react-router-dom";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import PostSection from "../components/PostSection";
import { useOverlay } from "../Context/OverlayProvider";
import Overlay from "../components/Overlay";
import UserInfo from "../components/UserInfo";
import { ReactComponent as SmallLogo } from "../icons/small_logo.svg";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 580px 1fr;
    text-align: center;
    justify-content: center;
`;

const Left = styled.div`
    max-width: 420px;
    display: grid;
    grid-template-rows: 100px 1fr;
`;

const Logo = styled(SmallLogo)`
    &:hover {
        cursor: pointer;
    }
`;

export const loader = ({ params }) => params.userId;

export default function PostsPage() {
    const userId = useLoaderData();
    const { curOverlay, closeOverlay } = useOverlay();

    return (
        <Container>
            <Left>
                <Link to="/">
                    <Logo />
                </Link>
                <UserInfo />
            </Left>
            <PostSection />
            <Sidebar />
            <Overlay
                visible={curOverlay.isVisible}
                type={curOverlay?.type}
                onClose={closeOverlay}
            />
        </Container>
    );
}
