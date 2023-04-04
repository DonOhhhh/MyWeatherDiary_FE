import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as SmallLogo } from "./icons/Logo/logo.svg";
import Sidebar from "./components/Sidebar";
import UserInfo from "./components/UserInfo";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 15% 85%;
    text-align: center;
    justify-content: center;
`;

const Left = styled.div`
    width: fit-content;
    word-break: keep-all;
    /* background: linear-gradient(to top, #daedff, white); */
    background-color: #ebf5ff;
    display: grid;
    grid-template-rows: 100px 1fr;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const Logo = styled(SmallLogo)`
    margin: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const UserInfoContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 50px;
`;

export default function Main() {
    return (
        <Container>
            <Left>
                <Link to="/main/diarys">
                    <Logo />
                </Link>
                <Sidebar />
            </Left>
            <Content>
                <Outlet />
            </Content>
            <UserInfoContainer>
                <UserInfo />
            </UserInfoContainer>
        </Container>
    );
}
