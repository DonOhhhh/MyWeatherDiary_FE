import styled from "@emotion/styled";
import { Button } from "@mui/material";

const CustomButton = styled.button`
    background: #c5e3ff;
    border: 5px solid #ffffff;
    border-radius: 20px;
    padding: 0;
    width: 100%;
    height: fit-content;

    font-family: "Jua";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    color: white;
    text-align: center;

    &:hover {
        background-color: #5d9dd8;
        cursor: pointer;
    }
`;

export default CustomButton;
