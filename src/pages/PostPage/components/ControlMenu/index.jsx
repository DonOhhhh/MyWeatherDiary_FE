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
} from "react-feather";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`;

function ControlMenu() {
    const listItemStyle = {
        "&:hover": {
            bgcolor: "#c5e3ff",
            color: "white",
            "& svg": { stroke: "white" },
        },
    };
    return (
        <Container>
            <List>
                <Divider />
                <ListItem sx={listItemStyle}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Edit2 />
                        </ListItemIcon>
                        <ListItemText>Write diary</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem sx={listItemStyle}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Activity />
                        </ListItemIcon>
                        <ListItemText>Activity</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem sx={listItemStyle}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Calendar />
                        </ListItemIcon>
                        <ListItemText>Calendar</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem sx={listItemStyle}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Share />
                        </ListItemIcon>
                        <ListItemText>Export</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem sx={listItemStyle}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MoreHorizontal />
                        </ListItemIcon>
                        <ListItemText>More</ListItemText>
                    </ListItemButton>
                </ListItem>
                <Divider />
            </List>
        </Container>
    );
}

export default ControlMenu;
