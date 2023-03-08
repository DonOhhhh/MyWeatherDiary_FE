import { createContext, useCallback, useContext, useEffect } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import axios from "axios";
import { v4 } from "uuid";

const OverlayContext = createContext();
export const useOverlay = () => useContext(OverlayContext);

export default function OverlayProvider({ children }) {
    const [curOverlay, setCurOverlay] = useSessionStorage("curOverlay", {
        isVisible: false,
    });

    const InitialData = useCallback(
        (id) => ({
            date: new Date(Date.now() + 9 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10),
            emotion: "good",
            contents: [
                {
                    id,
                    imgSrc: "",
                    comment: "",
                },
            ],
        }),
        []
    );

    const [tmpDiary, setTmpDiary] = useSessionStorage(
        "tmpDiary",
        InitialData(v4())
    );
    const [diarys, setDiarys] = useSessionStorage("diarys", []);

    useEffect(() => {
        curOverlay.isVisible &&
            document.body.style.setProperty("--scrollbarWidth", "0px");
    }, [curOverlay.isVisible]);

    const openOverlay = (btnType) => {
        setCurOverlay({ isVisible: true, type: btnType });
        document.body.style.setProperty("--scrollbarWidth", "0px");
        // console.log(btnType + ` Clicked!`);
    };

    const closeOverlay = () => {
        setCurOverlay({ isVisible: false });
        document.body.style.setProperty("--scrollbarWidth", "15px");
    };

    return (
        <OverlayContext.Provider
            value={{
                curOverlay,
                openOverlay,
                closeOverlay,
                diarys,
                setDiarys,
            }}
        >
            {children}
        </OverlayContext.Provider>
    );
}
