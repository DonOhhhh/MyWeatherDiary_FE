import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MenuItem({ children, href, itemText, ...props }) {
    const listItemStyle = {
        borderRadius: "15px",
        "& svg": { stroke: "black" },
        "&:hover": {
            bgcolor: "#c5e3ff",
            color: "white",
            "& svg": { stroke: "white" },
        },
    };

    const navigate = useNavigate();

    return (
        <ListItem sx={listItemStyle}>
            <ListItemButton onClick={() => navigate(`${href}`)}>
                <ListItemIcon>{children}</ListItemIcon>
                <ListItemText>{itemText}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
}
