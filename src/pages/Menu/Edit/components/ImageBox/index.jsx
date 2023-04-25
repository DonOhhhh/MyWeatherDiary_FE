import styled from "@emotion/styled";
import { ReactComponent as AddCircle } from "../../icons/add_circle.svg";

const ShowBox = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 250px;
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

export default function ImageBox({
    form: { setFieldValue },
    field: { name, value },
}) {
    const reader = new FileReader();
    return (
        <ShowBox src={value}>
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
        </ShowBox>
    );
}
