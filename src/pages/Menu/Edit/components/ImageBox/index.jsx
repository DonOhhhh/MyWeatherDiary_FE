import styled from "@emotion/styled";
import { ReactComponent as AddCircle } from "../../icons/add_circle.svg";
import React, { useState } from "react";
import Spinner from "../../../../../common/components/Spinner";
import { current } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const ShowBox = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 15px;
    color: #aaa;
    gap: 20px;
    background-image: url(${({ src }) => src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
        cursor: pointer;
    }
`;

function ImageBox({
    form: { setFieldValue },
    field: { name, value },
    pushRef,
}) {
    const [isLoading, setIsLoading] = useState(false);
    // console.log(pushRef.current);
    return (
        <ShowBox src={value}>
            {isLoading ? (
                <Spinner size={30} />
            ) : (
                <>
                    <input
                        style={{ display: "none" }}
                        name={name}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            const reader = new FileReader();
                            const files = e.target.files;
                            if (files.length === 0) {
                                return;
                            }
                            for (let i = 0; i < files.length; i++) {
                                const reader = new FileReader();
                                reader.readAsDataURL(files[i]);

                                reader.onloadstart = () => {
                                    setFieldValue(name, null);
                                    setIsLoading(true);
                                };

                                reader.onloadend = () => setIsLoading(false);

                                reader.onload = () => {
                                    if (i === 0) {
                                        setFieldValue(name, reader.result);
                                    } else {
                                        // Create a new ContentBox with the image data
                                        const newContent = {
                                            id: v4(),
                                            img: reader.result,
                                            comment: "",
                                        };
                                        pushRef.current(newContent);
                                    }
                                };
                            }
                        }}
                    />
                    {!value && <AddCircle />}
                    {!value && (
                        <p style={{ margin: "0", padding: "0" }}>
                            {"사진을 추가하세요"}
                        </p>
                    )}
                </>
            )}
        </ShowBox>
    );
}

function areEqual(prevProps, nextProps) {
    return prevProps.field.value === nextProps.field.value;
}

export default React.memo(ImageBox, areEqual);
