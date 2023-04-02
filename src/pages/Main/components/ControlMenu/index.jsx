import styled from "@emotion/styled";
import { List } from "@mui/material";
import { Edit2, Activity, User, Unlock, BookOpen } from "react-feather";
import MenuItem from "../MenuItem";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

function ControlMenu() {
    const listStyle = {
        padding: "0",
    };

    const ITEMS = [
        {
            itemText: "Activity",
            href: "/main/activity",
            icon: <Activity />,
        },
        {
            itemText: "Diarys",
            href: "/main/diarys",
            icon: <BookOpen />,
        },
        {
            itemText: "New diary",
            href: "/main/newdiary",
            icon: <Edit2 />,
        },
        {
            itemText: "Profile",
            href: "/main/profile",
            icon: <User />,
        },
        {
            itemText: "Log out",
            href: "/login",
            icon: <Unlock />,
        },
    ];

    return (
        <Container>
            <List sx={listStyle}>
                {ITEMS.map(({ itemText, href, icon }, index) => (
                    <MenuItem key={index} href={href} itemText={itemText}>
                        {icon}
                    </MenuItem>
                ))}
            </List>
        </Container>
    );
}

export default ControlMenu;
