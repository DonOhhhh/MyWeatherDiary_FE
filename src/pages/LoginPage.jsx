import styled from "@emotion/styled";
import axios from "axios";
import { useRef, useState } from "react";
import { Form, redirect } from "react-router-dom";
import CreateDiaryModal from "../components/CreateDiaryModal";
import { ReactComponent as LoginLogo } from "../icons/Logo/Login.svg";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: #c5e3ff;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
`;

const Center = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const InputKey = styled.input`
    padding: 20px 30px;
    border: 5px solid #a1d2ff;
    border-radius: 40px;

    font-family: "Jua";
    font-weight: 400;
    font-size: 36px;
    color: #c5e3ff;

    caret-color: black;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #c5e3ff;
    }
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 10px;
    gap: 10px;
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

export async function action({ request }) {
    const formData = await request.formData();
    const res = Object.fromEntries(formData);
    if (res.type === "login") {
        if (res.key === "8901") return redirect("/4/posts");
        alert("Diary가 존재하지 않습니다.");
    } else if (res.type === "createDiary") {
        // 키를 받아오고 email로 전송 modal 표시내용 바꿈.
        const now = new Date().toISOString().slice(0, 19);
        const req = { diary_title: res.title, createDate: now };
        try {
            const result = await axios.post(
                "http://192.168.0.47:8080/auth/register",
                req
            );
            console.log(result.enter_key);
        } catch (error) {
            console.log(error.message);
        }
        return "8901";
    }
    return res;
}

export default function LoginPage() {
    const [isVisible, setVisible] = useState(false);
    const [modalType, setModalType] = useState("inputInfo");
    const loginRef = useRef(null);
    return (
        <Container>
            {isVisible ? (
                <CreateDiaryModal
                    type={modalType}
                    onClose={() => {
                        setVisible(false);
                        setModalType("inputInfo");
                    }}
                />
            ) : null}
            <Center method="post">
                <LoginLogo style={{ margin: "0px" }} />
                <InputKey
                    placeholder="Enter your key..."
                    name="key"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            loginRef.current.click();
                        }
                    }}
                />
                <ButtonBox>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisible(true);
                        }}
                    >
                        Generate Key
                    </Button>
                    <Button ref={loginRef}>Login</Button>
                </ButtonBox>
                <input
                    type="hidden"
                    name="type"
                    value="login"
                    style={{ display: "none" }}
                />
            </Center>
        </Container>
    );
}
