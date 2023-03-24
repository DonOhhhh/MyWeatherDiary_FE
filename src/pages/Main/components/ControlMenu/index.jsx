import styled from "@emotion/styled";
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Edit2,
    Calendar,
    Activity,
    Share,
    MoreHorizontal,
    User,
    Unlock,
} from "react-feather";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

function ControlMenu() {
    const navigate = useNavigate();
    const listStyle = {
        padding: "0",
    };
    const listItemStyle = {
        borderRadius: "15px",
        "& svg": { stroke: "black" },
        "&:hover": {
            bgcolor: "#c5e3ff",
            color: "white",
            "& svg": { stroke: "white" },
        },
    };
    return (
        <Container>
            <List sx={listStyle}>
                <ListItem sx={listItemStyle}>
                    <ListItemButton onClick={() => navigate(`/main/diarys`)}>
                        <ListItemIcon>
                            <Activity />
                        </ListItemIcon>
                        <ListItemText>Diarys</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <ListItemButton onClick={() => navigate(`/main/edit`)}>
                        <ListItemIcon>
                            <Edit2 />
                        </ListItemIcon>
                        <ListItemText>New diary</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <ListItemButton onClick={() => navigate(`/main/profile`)}>
                        <ListItemIcon>
                            <User />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <ListItemButton onClick={() => navigate(`/main/export`)}>
                        <ListItemIcon>
                            <Share />
                        </ListItemIcon>
                        <ListItemText>Export</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <ListItemButton onClick={() => navigate("/login")}>
                        <ListItemIcon>
                            <Unlock />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Container>
    );
}

export default ControlMenu;
