import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import Monthly from "./components/Monthly";
import Yearly from "./components/Yearly";
import { useDispatch, useSelector } from "react-redux";
import {
    clearExportData,
    fetchCalendar,
    makeFakeData,
    setLoaded,
    setLoading,
} from "./reducer/activitySlice";
import html2canvas from "html2canvas";
import Spinner from "./../../../common/components/Spinner/index";
import Loading from "./../../../common/components/Loading/index";
import axios from "axios";
import { generatePDF } from "./components/Monthly/generatePDF";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 8%;
    width: 80%;
    min-width: 400px;
    height: 100%;
    gap: 20px;
    /* overflow-x: scroll; */
`;

const SelectContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80%;
    height: fit-content;
`;

const SelectType = styled.select`
    font-size: 20px;
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
    const state = useSelector((state) => state.activity);
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
    useEffect(() => {
        dispatch(makeFakeData(startDate));
        console.log("fetchCalendar action dispatched!");
        dispatch(fetchCalendar(KST.getFullYear()));
    }, []);

    const EmotionToNum = useMemo(
        () => ({
            HAPPY: "1",
            SAD: "2",
            NEUTRAL: "3",
            ANGER: "4",
        }),
        []
    );

    const fetchContentsImg = useCallback(async (contents) => {
        try {
            console.log(`fetchContentsImg started!`);
            const sortedContents = contents
                .slice()
                .sort((a, b) => a.contentOrder - b.contentOrder);
            console.log(sortedContents);
            const results = await Promise.all(
                sortedContents.map(({ id }) =>
                    axios.get("" + `/diary/content/${id}`)
                )
            );
            let data = results.map((result, i) => ({
                id: sortedContents[i].id,
                img: result.data.data,
                comment: sortedContents[i].comment,
                contentOrder: sortedContents[i].contentOrder + 1,
            }));
            return data;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const processData = useCallback(async (exportData) => {
        const data = exportData
            .slice()
            .sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        console.log(data);
        const result = await Promise.all(
            data.map(async ({ emotion, postDate, contents }) => {
                return {
                    postDate: postDate.slice(0, 10),
                    emotion: EmotionToNum[emotion],
                    contents: await fetchContentsImg(contents),
                };
            })
        );
        return result;
    }, []);

    useEffect(() => {
        if (!state.exportData?.length) return;

        dispatch(setLoading());
        console.log(`processData executed`);
        processData(state.exportData).then((res) => {
            // console.log("generatePDF started!");
            generatePDF(res);
            console.log("generatePDF finished!");
            dispatch(setLoaded());
            dispatch(clearExportData());
        });
    }, [state.exportData]);

    return (
        <Container>
            {state.exportLoading && (
                <Loading>
                    <Spinner size={50} />
                </Loading>
            )}
            <Center>
                <SelectContainer>
                    <SelectType
                        name="type"
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
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
                    {state.loading ? (
                        <div
                            style={{
                                width: "100%",
                                height: "510px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Spinner size={100} />
                        </div>
                    ) : type === "yearly" ? (
                        <Yearly
                            calendar={state.calendar}
                            onChecked={onChecked}
                            onCheckboxClick={handleOnChecked}
                        />
                    ) : (
                        <Monthly calendar={state.calendar} />
                    )}
                </ActivityContainer>
            </Center>
        </Container>
    );
}
