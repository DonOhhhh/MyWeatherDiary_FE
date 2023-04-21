import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";
import { useDispatch, useSelector } from "react-redux";
import { makeFakeData } from "./reducer/activitySlice";
import html2canvas from "html2canvas";

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
    margin-top: 5%;
    width: 80%;
    min-width: 400px;
    height: 100%;
    gap: 20px;
    overflow-x: scroll;
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

export const takeScreenshot = (ref) => {
    html2canvas(ref.current).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${new Date().toISOString()}.png`;
        link.href = image;
        link.click();
    });
};

export const ButtonBox = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

export const ExportButton = styled.div`
    border: 1px solid #aaa;
    border-radius: 15px;
    font-family: Jua;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    min-width: 100px;
    height: fit-content;
    box-shadow: 0 2px 5px 1px gray;
    &:hover {
        cursor: pointer;
        box-shadow: 0 5px 5px 1px gray;
        transform: translate(0, -4px);
        transition: all 0.2s ease;
    }
    &:active {
        cursor: pointer;
        box-shadow: 0 2px 5px 1px gray;
        transform: translate(0, 4px);
        transition: all 0.2s ease;
    }
`;

export default function Activity() {
    const calendar = useSelector((state) => state.activity).calendar.slice();
    const dispatch = useDispatch();

    const KST = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const [startDate, setStartDate] = useState(`${KST.getFullYear()}-01-01`);

    const [onChecked, setOnChecked] = useState(false);
    const handleOnChecked = (e) => {
        if (e.target.checked) {
            setStartDate(KST.toISOString().split("T", 1)[0]);
        } else {
            setStartDate(`${KST.getFullYear()}-01-01`);
        }
        setOnChecked(!onChecked);
    };

    const [type, setType] = useState("monthly");
    const handleChange = (e) => {
        setType(e.target.value);
    };
    // useEffect(() => {
    //     dispatch(makeFakeData(startDate));
    // }, []);
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
                        <option name="type" value="monthly">
                            Monthly
                        </option>
                        <option name="type" value="yearly">
                            Yearly
                        </option>
                    </SelectType>
                </SelectContainer>
                <ActivityContainer>
                    {type === "yearly" ? (
                        <Yearly
                            calendar={calendar}
                            onChecked={onChecked}
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
