import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";
import { useDispatch, useSelector } from "react-redux";
import { makeFakeData } from "./reducer/activitySlice";

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
    const KST = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const [type, setType] = useState("monthly");
    const [startDate, setStartDate] = useState(KST.toISOString().split("T", 1));
    const handleOnChecked = (e) => {
        if (e.target.checked) setStartDate(`${KST.getFullYear()}-01-01`);
        else setStartDate(KST.toISOString().split("T", 1)[0]);
    };
    const calendar = useSelector((state) => state.activity);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setType(e.target.value);
    };
    useEffect(() => {
        dispatch(makeFakeData(startDate));
    }, [startDate]);
    return (
        <Container>
            <Center>
                <SelectContainer>
                    <SelectType
                        name="type"
                        onChange={handleChange}
                        defaultValue={type}
                    >
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
                        <Yearly
                            calendar={calendar}
                            onCheckboxClick={handleOnChecked}
                        />
                    ) : (
                        <Monthly calendar={calendar} />
                    )}
                </ActivityContainer>
            </Center>
        </Container>
    );
}
