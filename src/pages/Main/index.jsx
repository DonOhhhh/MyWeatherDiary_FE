import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as SmallLogo } from "./icons/logo.svg";
import Sidebar from "./components/Sidebar";
import UserInfo from "./components/UserInfo";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorization, setToken } from "../Home/reducer/loginSlice";

const Container = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const Left = styled.div`
    word-break: keep-all;
    /* background: linear-gradient(to top, #daedff, white); */
    background-color: #ebf5ff;
    display: grid;
    grid-template-rows: 78px 1fr;
    justify-content: center;
    position: fixed;
    width: fit-content;
    min-height: 100vh;
    height: fit-content;
    z-index: 2;
`;

const Content = styled.div`
    width: 100%;
    height: fit-content;
    margin-left: 170px;
`;

const LogoLink = styled(Link)`
    display: flex;
    justify-content: center;
    margin: 10px 10px;
    height: ${({ isexpand }) => isexpand};
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
    const navigate = useNavigate();
    const [width, setWidth] = useState(0);
    const [isExpand, setIsExpand] = useState(true);
    const state = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        setWidth(sidebarRef.current.offsetWidth);
    }, [sidebarRef, isExpand]);

    useEffect(() => {
        if (!state.loading) {
            if (!state.token) dispatch(setToken());
            else dispatch(setAuthorization());
        }
    }, [state.token]);

    const onChevronClick = () => {
        setIsExpand(!isExpand);
    };

    return (
        <Container>
            <Left ref={sidebarRef}>
                <LogoLink
                    to="/main/diarys"
                    isexpand={isExpand ? "78px" : "24px"}
                >
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
