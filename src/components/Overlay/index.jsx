import styled from "@emotion/styled";
import useClickAway from "../../hooks/useClickAway";
import AddPost from "../AddPost";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const OverlayContainer = styled.div`
    position: fixed;
    width: 400px;
    height: 100%;
    top: 0;
    ${({ type }) => (type === "Add" ? `right : 0;` : null)}
    margin: 0;
    background-color: #d3eaff;
    border-radius: ${({ type }) =>
        type === "Add" ? "15px 0px 0px 15px" : "0px 15px 15px 0px"};
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 15px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgray;
        border-radius: 15px;
        background-clip: padding-box;
        border: 4px solid transparent;
    }

    &::-webkit-scrollbar-track {
        background-color: whitesmoke;
    }
`;

export default function Overlay({
    children,
    type,
    width,
    visible = false,
    onClose,
    ...props
}) {
    const ref = useClickAway(() => onClose && onClose());

    return (
        <BackgroundDim style={{ display: visible ? "block" : "none" }}>
            <OverlayContainer ref={ref} type={type}>
                <AddPost />
            </OverlayContainer>
        </BackgroundDim>
    );
}
