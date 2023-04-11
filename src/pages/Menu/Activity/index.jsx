import styled from "@emotion/styled";
import { useState } from "react";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3%;
    width: 80%;
    min-width: 400px;
    height: 100%;
    gap: 20px;
`;

const SelectContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80%;
    height: fit-content;
`;

const SelectType = styled.select`
    font-size: 24px;
    width: fit-content;
    height: fit-content;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        cursor: pointer;
        box-shadow: 0 0px 5px hsla(0, 0%, 0%, 0.2),
            0 5px 6px hsla(0, 0%, 0%, 0.2);
    }
`;

const ActivityContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    position: relative;
`;

export default function Activity() {
    const [type, setType] = useState("yearly");
    const handleChange = (e) => {
        setType(e.target.value);
    };
    return (
        <Container>
            <Center>
                <SelectContainer>
                    <SelectType name="type" onChange={handleChange}>
                        <option hidden>선택하세요</option>
                        <option name="type" value="yearly">
                            Yearly
                        </option>
                        <option name="type" value="monthly">
                            Monthly
                        </option>
                    </SelectType>
                </SelectContainer>
                <ActivityContainer>
                    {type === "yearly" ? (
                        <Yearly startDate={"2023-04-11"} />
                    ) : (
                        <Monthly />
                    )}
                </ActivityContainer>
            </Center>
        </Container>
    );
}
