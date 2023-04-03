import styled from "@emotion/styled";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: #c5e3ff;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
`;

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home/login");
    }, []);
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    );
}
