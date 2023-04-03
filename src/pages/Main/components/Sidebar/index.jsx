import styled from "@emotion/styled";
import { Edit2, Activity, User, Unlock, BookOpen } from "react-feather";
import MenuItem from "../MenuItem";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
`;

const ITEMS = [
    {
        itemText: "Activity",
        href: "/main/activity",
        icon: <Activity />,
        pathname: "activity",
    },
    {
        itemText: "Diarys",
        href: "/main/diarys",
        icon: <BookOpen />,
        pathname: "diarys",
    },
    {
        itemText: "New diary",
        href: "/main/newdiary",
        icon: <Edit2 />,
        pathname: "newdiary",
    },
    {
        itemText: "Profile",
        href: "/main/profile",
        icon: <User />,
        pathname: "profile",
    },
    {
        itemText: "Log out",
        href: "/home/login",
        icon: <Unlock />,
    },
];

export default function Sidebar() {
    return (
        <Container>
            <List>
                {ITEMS.map(({ itemText, href, icon, pathname }, index) => (
                    <MenuItem
                        key={index}
                        href={href}
                        itemText={itemText}
                        path={pathname}
                    >
                        {icon}
                    </MenuItem>
                ))}
            </List>
        </Container>
    );
}
