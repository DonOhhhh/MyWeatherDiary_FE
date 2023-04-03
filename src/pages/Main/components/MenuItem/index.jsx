import styled from "@emotion/styled";
import { ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0 15px 15px 0;
    padding: 20px;
    width: 100%;
    height: 4rem;
    & svg {
        stroke: black;
    }
    &:hover {
        cursor: pointer;
        background-color: #c5e3ff;
        color: white;
        width: calc(100% + 20px);
        & svg {
            stroke: white;
        }
    }
`;

const SelectedListItem = styled(ListItem)`
    background-color: #c5e3ff;
    color: white;
    width: calc(100% + 20px);
    & svg {
        stroke: white;
    }
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
`;

const ListText = styled.div`
    white-space: nowrap;
    text-align: left;
    vertical-align: middle;
    font-family: Inter;
`;

export default function MenuItem({ children, href, itemText, path }) {
    const navigate = useNavigate();
    const [, , lastPath] = location.pathname.split("/");
    return lastPath === path ? (
        <SelectedListItem onClick={() => navigate(`${href}`)}>
            <ListItemIcon>{children}</ListItemIcon>
            <ListText>{itemText}</ListText>
        </SelectedListItem>
    ) : (
        <ListItem onClick={() => navigate(`${href}`)}>
            <ListItemIcon>{children}</ListItemIcon>
            <ListText>{itemText}</ListText>
        </ListItem>
    );
}
