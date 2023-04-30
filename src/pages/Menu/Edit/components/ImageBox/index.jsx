import styled from "@emotion/styled";
import { ReactComponent as AddCircle } from "../../icons/add_circle.svg";
import React, { useState } from "react";
import Spinner from "../../../../../common/components/Spinner";

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

function ImageBox({ form: { setFieldValue }, field: { name, value } }) {
    const reader = new FileReader();
    const [isLoading, setIsLoading] = useState(0);

    return (
        <ShowBox src={value}>
            {isLoading === 1 ? (
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
                            const files = e.target.files;
                            if (files.length === 0) {
                                return;
                            }
                            reader.readAsDataURL(files[0]);
                            reader.onloadstart = () => {
                                setFieldValue(name, null);
                                setIsLoading(1);
                            };
                            reader.onloadend = () => setIsLoading(0);
                            reader.onload = () => {
                                setFieldValue(name, reader.result);
                            };
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

export default React.memo(ImageBox);
