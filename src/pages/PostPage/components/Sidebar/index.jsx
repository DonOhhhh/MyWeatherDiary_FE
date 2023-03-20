import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { ReactComponent as Add } from "../../icons/SidebarIcons/add.svg";
import { ReactComponent as Calender } from "../../icons/SidebarIcons/calendar.svg";
import { ReactComponent as Chart } from "../../icons/SidebarIcons/chart.svg";
import { ReactComponent as Export } from "../../icons/SidebarIcons/export.svg";
import { ReactComponent as More } from "../../icons/SidebarIcons/more.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 10px;

    position: fixed;
    top: 270px;
    left: 1020px;
    width: 70px;
    height: fit-content;
    background-color: #c5e3ff;
    border-radius: 15px;
    & svg:hover {
        background-color: #5d9dd8;
        border-radius: 15px;
        cursor: pointer;
    }
`;

function Sidebar() {
    const size = 70;
    const borderStyle = {
        margin: "5px 10px",
        border: "1.5px solid white",
        borderRadius: "10px",
    };
    return (
        <Container>
            <Add width={size} height={size} />
            <Divider sx={borderStyle} />
            <Calender width={size} height={size} />
            <Divider sx={borderStyle} />
            <Chart width={size} height={size} />
            <Divider sx={borderStyle} />
            <Export width={size} height={size} />
            <Divider sx={borderStyle} />
            <More width={size} height={size} />
        </Container>
    );
}

export default Sidebar;
