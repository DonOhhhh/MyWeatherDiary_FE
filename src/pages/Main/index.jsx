import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as SmallLogo } from "./icons/Logo/Post.svg";
import { useState } from "react";
import ControlMenu from "./components/ControlMenu";

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
    width: 100%;
    /* background: linear-gradient(to top, #daedff, white); */
    background-color: #ebf5ff;
    display: grid;
    grid-template-rows: 100px 1fr;
    justify-content: center;
`;

const Logo = styled(SmallLogo)`
    &:hover {
        cursor: pointer;
    }
`;

export default function Main() {
    const [profile, setProfile] = useState(false);
    const [menu, setMenu] = useState(false);
    return (
        <Container>
            <Left>
                <Link to="/main">
                    <Logo />
                </Link>
                <ControlMenu />
            </Left>
            <Outlet />
        </Container>
    );
}
