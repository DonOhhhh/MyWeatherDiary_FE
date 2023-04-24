import styled from "@emotion/styled";
import {
    Edit2,
    Activity,
    User,
    Unlock,
    BookOpen,
    ChevronLeft,
    ChevronRight,
} from "react-feather";
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
    align-items: flex-start;
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
        itemText: "Diary",
        href: "/main/diarys",
        icon: <BookOpen />,
        pathname: "diarys",
    },
    {
        itemText: "Profile",
        href: "/main/profile",
        icon: <User />,
        pathname: "profile",
    },
    {
        itemText: "Log out",
        href: "/",
        icon: <Unlock />,
    },
];

const WidthControllerContainer = styled.div`
    --width: 20px;
    --height: calc(var(--width) * 2);
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: var(--width);
    height: var(--height);
    border-radius: 0 10px 10px 0;
    border: 0;
    padding: 5px;
    background-color: #ebf5ff;
    position: relative;
    left: ${({ parentWidth }) => parentWidth}px;
    top: -70px;
    /* transform: translate(${({ parentWidth }) => parentWidth}px, -70px); */
    margin-bottom: -30px;
    &:hover {
        /* background-color: #7dbffd; */
        & polyline {
            stroke: white;
        }
        cursor: pointer;
    }
`;

export default function Sidebar({ width, isExpand, onChevronClick }) {
    return (
        <Container>
            <WidthControllerContainer
                parentWidth={width}
                onClick={onChevronClick}
            >
                {isExpand ? <ChevronLeft /> : <ChevronRight />}
            </WidthControllerContainer>
            <List>
                {ITEMS.map(({ itemText, href, icon, pathname }, index) => (
                    <MenuItem
                        key={index}
                        href={href}
                        itemText={itemText}
                        path={pathname}
                        isExpand={isExpand}
                    >
                        {icon}
                    </MenuItem>
                ))}
            </List>
        </Container>
    );
}
