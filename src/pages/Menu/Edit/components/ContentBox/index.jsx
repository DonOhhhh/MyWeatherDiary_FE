import styled from "@emotion/styled";
import DeleteBtn from "../DeleteBtn";
import AddCircleIcon from "../../icons/add_circle.svg";
import Icon from "../Icon";
import { useCallback } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
    gap: 5px;

    width: 100%;
    height: auto;

    border: 1px dashed #a3a3a3;
    border-radius: 15px;
`;

const InputImageBox = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 200px;

    background: url(${({ src }) => src});
    background-size: cover;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;

    &:hover {
        cursor: pointer;
    }
`;

const InputComment = styled.textarea`
    display: inline-block;
    vertical-align: top;

    width: 100%;
    height: 300px;
    padding: 1rem;

    font-family: "Jua";
    font-size: 20px;
    font-weight: 400;

    background-color: white;
    border: 1px solid #ddd;
    border-radius: 15px;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export default function ContentBox({
    index,
    contentId,
    imgSrc,
    comment,
    onChanged,
    onDelete,
    onCommentChange,
}) {
    return (
        <Container>
            <DeleteBtn
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(contentId);
                    // alert("DeleteBtn");
                }}
            />
            <InputImageBox src={imgSrc}>
                <input
                    type="file"
                    accept="image/*"
                    name={`image${index}`}
                    style={{ display: "none" }}
                    onClick={(e) => {
                        // alert("input[type=file]");
                        e.stopPropagation();
                    }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            // onChanged(
                            //     contentId,
                            //     URL.createObjectURL(file),
                            //     comment
                            // );
                            onChanged(contentId, reader.result, comment);
                        };
                    }}
                />
                {imgSrc ? null : (
                    <>
                        <Icon svgUrl={AddCircleIcon} size="70px" />
                        <div
                            style={{ color: "#9b9b9b" }}
                        >{`사진을 선택해주세요(필수x)`}</div>
                    </>
                )}
            </InputImageBox>
            <InputComment
                type="text"
                placeholder="some comments..."
                name={`comment${index}`}
                defaultValue={comment}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                    onCommentChange(contentId, imgSrc, e.target.value)
                }
            />
        </Container>
    );
}
