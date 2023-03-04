import styled from "@emotion/styled";
import Icon from "../Icon";
import Add from "../../icons/add.svg";
import Calendar from "../../icons/calendar.svg";
import Chart from "../../icons/chart.svg";
import Export from "../../icons/export.svg";
import More from "../../icons/more.svg";
import Divider from "../Divider";
import { useOverlay } from "../../Context/OverlayProvider";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0 10px;

    position: sticky;
    width: 70px;
    height: fit-content;
    transform: translateY(250px);
    background-color: #c5e3ff;
    border-radius: 15px;
`;

export default function Sidebar() {
    const { openOverlay } = useOverlay();
    return (
        <Container>
            <Icon
                name="Add"
                svgUrl={Add}
                size="70px"
                hoverColor="#5D9DD8"
                onClick={() => openOverlay("Add")}
            />
            <Divider
                hMargin={10}
                vMargin={7}
                lineThickness={1.5}
                lineColor="white"
            />
            <Icon
                name="Calendar"
                svgUrl={Calendar}
                size="70px"
                hoverColor="#5D9DD8"
                // onClick={() => openOverlay("Calendar")}
            />
            <Divider
                hMargin={10}
                vMargin={7}
                lineThickness={1.5}
                lineColor="white"
            />
            <Icon
                name="Chart"
                svgUrl={Chart}
                size="70px"
                hoverColor="#5D9DD8"
                onClick={() => openOverlay("Chart")}
            />
            <Divider
                hMargin={10}
                vMargin={7}
                lineThickness={1.5}
                lineColor="white"
            />
            <Icon
                name="Export"
                svgUrl={Export}
                size="70px"
                hoverColor="#5D9DD8"
                onClick={() => openOverlay("Export")}
            />
            <Divider
                hMargin={10}
                vMargin={7}
                lineThickness={1.5}
                lineColor="white"
            />
            <Icon
                name="More"
                svgUrl={More}
                size="70px"
                hoverColor="#5D9DD8"
                // onClick={() => openOverlay("More")}
            />
        </Container>
    );
}
