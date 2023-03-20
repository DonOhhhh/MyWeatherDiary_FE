import styled from "@emotion/styled";
import { useState } from "react";
import { Form } from "react-router-dom";
import CustomButton from "../CustomButton";
import { ReactComponent as Copy } from "../../icons/copy.svg";
import { Modal } from "@mui/material";

const Container = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 35px;
    gap: 10px;

    position: relative;
    width: 700px;
    height: 300px;

    background: #c5e3ff;
    border: 5px solid #ffffff;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`;

const InputBox = styled.input`
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border: 5px solid #a29b9b;
    border-radius: 20px;

    font-family: "Inter";
    font-weight: 400;
    font-size: 24px;

    &:focus {
        outline: none;
    }
`;

const CopyIcon = styled(Copy)`
    &:hover {
        & path {
            fill: black;
        }
        cursor: pointer;
    }
`;

const Copied = styled.div`
    position: relative;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    width: 210px;
    height: 60px;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 20px;
    border: 0;

    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: white;
`;

function CreateDiary({ setOpen }) {
    const [keyExist, setKeyExist] = useState(false);
    const [copied, setCopied] = useState(false);
    const [key, setKey] = useState("key");
    return (
        <Container
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setKeyExist(true);
            }}
        >
            {!keyExist ? (
                <>
                    <InputBox
                        type="email"
                        required
                        placeholder="Input Email"
                        name="email"
                    />
                    <InputBox
                        type="text"
                        required
                        placeholder="Input Nickname"
                        name="nickname"
                    />
                    <CustomButton>Create</CustomButton>
                </>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                            margin: "0",
                            padding: "0",
                            width: "100%",
                            height: "fit-content",
                        }}
                    >
                        <InputBox
                            disabled
                            value={key}
                            style={{
                                backgroundColor: "white",
                                textAlign: "center",
                            }}
                            name="key"
                        />
                        <CopyIcon
                            width={40}
                            height={40}
                            onClick={() => {
                                window.navigator.clipboard.writeText(key);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                        />
                    </div>
                    {copied && <Copied>Copied!</Copied>}
                </>
            )}
        </Container>
    );
}

export default CreateDiary;
