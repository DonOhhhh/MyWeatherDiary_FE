import { useLoaderData } from "react-router-dom";
import styled from "@emotion/styled";
import Sidebar from "../components/Sidebar";
import PostSection from "../components/PostSection";
import { useOverlay } from "../Context/OverlayProvider";
import Overlay from "../components/Overlay";

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
    direction: grid;
    grid-template-rows: 100px 1fr;
`;

const Logo = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
`;

const MyInfo = styled.div`
    position: relative;
    height: 100%;
`;

export const loader = ({ params }) => params.userId;

export default function PostsPage() {
    const userId = useLoaderData();
    const { curOverlay, closeOverlay } = useOverlay();

    return (
        <Container>
            <Left>
                <Logo />
                <MyInfo>userId : {userId}</MyInfo>
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
