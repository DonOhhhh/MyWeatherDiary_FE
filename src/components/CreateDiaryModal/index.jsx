import styled from "@emotion/styled";
import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import useClickAway from "../../hooks/useClickAway";
import CopyIcon from "../../icons/copy.svg";
import CopyFilledIcon from "../../icons/copy_filled.svg";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled(Form)`
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

const Button = styled.button`
    width: 100%;
    background: #c5e3ff;
    border: 5px solid #ffffff;
    border-radius: 20px;

    font-family: "Jua";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    color: white;

    &:hover {
        background-color: #5d9dd8;
        cursor: pointer;
    }
`;

const Icon = styled.div`
    margin: 0;
    padding: 10px;
    border-radius: 15px;
    background-image: url(${({ src }) => src});
    width: 30px;
    height: 30px;
    &:hover {
        background-image: url(${({ filledIcon }) => filledIcon});
        cursor: pointer;
    }
`;

const CopiedModal = styled.div`
    position: absolute;
    bottom: 10px;
    left: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 210px;
    height: 60px;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 20px;

    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: white;
`;

export default function CreateDiaryModal({ onClose }) {
    const ref = useClickAway(() => onClose && onClose());
    const key = useActionData();
    const [copied, setCopied] = useState(false);
    return (
        <BackgroundDim>
            {typeof key !== "string" ? (
                <ModalBox ref={ref} method="post">
                    <InputBox
                        placeholder="Email을 입력하세요"
                        type="email"
                        name="email"
                        required
                    />
                    <InputBox
                        placeholder="Diary 제목을 입력하세요"
                        type="text"
                        name="title"
                        required
                    />
                    <input
                        type="text"
                        name="type"
                        defaultValue="createDiary"
                        style={{ display: "none" }}
                    />
                    <Button>Create</Button>
                </ModalBox>
            ) : (
                <ModalBox
                    ref={ref}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        verticalAlign: "center",
                    }}
                >
                    <InputBox
                        disabled
                        value={key}
                        style={{
                            backgroundColor: "white",
                            textAlign: "center",
                        }}
                    />
                    <Icon
                        src={CopyIcon}
                        filledIcon={CopyFilledIcon}
                        onClick={() => {
                            window.navigator.clipboard.writeText(key);
                            setCopied(true);
                            setTimeout(() => {
                                setCopied(false);
                            }, 2000);
                        }}
                    />
                    {copied ? (
                        <CopiedModal>Copied to Clipboard!</CopiedModal>
                    ) : null}
                </ModalBox>
            )}
        </BackgroundDim>
    );
}
