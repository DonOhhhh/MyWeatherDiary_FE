import { Link, Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as SmallLogo } from "./icons/logo.svg";
import Sidebar from "./components/Sidebar";
import UserInfo from "./components/UserInfo";
import { useCallback, useEffect, useRef, useState } from "react";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const Left = styled.div`
    width: fit-content;
    word-break: keep-all;
    /* background: linear-gradient(to top, #daedff, white); */
    background-color: #ebf5ff;
    display: grid;
    grid-template-rows: 78px 1fr;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const LogoLink = styled(Link)`
    display: flex;
    justify-content: center;
    margin: 10px 10px;
    height: 78px;
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
    const sidebarRef = useRef();
    const [width, setWidth] = useState(0);
    const [isExpand, setIsExpand] = useState(true);
    useEffect(() => {
        setWidth(sidebarRef.current.offsetWidth);
    }, [sidebarRef, isExpand]);

    const onChevronClick = () => {
        setIsExpand(!isExpand);
    };
    return (
        <Container>
            <Left ref={sidebarRef}>
                <LogoLink to="/main/diarys">
                    <SmallLogo />
                </LogoLink>
                <Sidebar
                    width={width}
                    isExpand={isExpand}
                    onChevronClick={onChevronClick}
                />
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
