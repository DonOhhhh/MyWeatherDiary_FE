import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Sidebar from "./components/Sidebar";
import UserInfo from "./components/UserInfo";
import { User, Menu } from "react-feather";
import { ReactComponent as SmallLogo } from "./icons/Logo/Post.svg";
import { useState } from "react";
import { Avatar, Dialog, Drawer, IconButton } from "@mui/material";
import PostSection from "./components/PostSection";
import ControlMenu from "./components/ControlMenu";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 580px 1fr;
    text-align: center;
    justify-content: center;
`;

const Left = styled.div`
    width: "fit-content";
    display: grid;
    grid-template-rows: 100px 1fr;
`;

const Right = styled.div`
    width: 100%;
    height: 100%;
`;

const Logo = styled(SmallLogo)`
    &:hover {
        cursor: pointer;
    }
`;

export default function PostsPage() {
    const [profile, setProfile] = useState(false);
    const [menu, setMenu] = useState(false);
    return (
        <Container>
            <Left>
                <Link to="/">
                    <Logo />
                </Link>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        onClick={() => setProfile(true)}
                        sx={{
                            "&:hover": { cursor: "pointer", boxShadow: 3 },
                            bgcolor: "#c5e3ff",
                        }}
                    >
                        <User />
                    </Avatar>
                    <Drawer
                        open={profile}
                        variant="temporary"
                        onClose={(event, reason) => {
                            if (
                                reason === "escapeKeyDown" ||
                                reason === "backdropClick"
                            ) {
                                setProfile(false);
                            }
                        }}
                        elevation={0}
                    >
                        <UserInfo />
                    </Drawer>
                </div>
            </Left>
            <PostSection />
            <Right>
                <IconButton
                    sx={{
                        border: "1px solid lightgray",
                        borderRadius: 2,
                        transform: "translate(0, 50px)",
                        "&:hover": { boxShadow: 3 },
                    }}
                    onClick={() => setMenu(true)}
                >
                    <Menu />
                </IconButton>
                <Drawer
                    anchor="right"
                    open={menu}
                    onClose={() => setMenu(false)}
                >
                    <ControlMenu />
                </Drawer>
            </Right>
        </Container>
    );
}
