import styled from "@emotion/styled";
import DeleteBtn from "../DeleteBtn";
import ImageBox from "../ImageBox";
import CommentBox from "../CommentBox";
import React, { useEffect } from "react";
import { Field } from "formik";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
    gap: 10px;

    width: 100%;
    height: 100%;

    border: 1px dashed #898989;
    border-radius: 15px;
`;

const RowBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    gap: 10px;
`;

function ContentsBox({ arrayHelpers, pushRef }) {
    const { remove, push, form } = arrayHelpers;
    if (!pushRef.current) {
        pushRef.current = push;
    }
    const { contents } = form.values;
    return (
        <>
            {contents.map((_, index) => (
                <StyledContent key={index}>
                    <DeleteBtn onClick={() => remove(index)} />
                    <RowBox
                        style={{
                            height: "300px",
                        }}
                    >
                        <Field
                            name={`contents[${index}].img`}
                            component={ImageBox}
                            pushRef={pushRef}
                        />
                        <Field
                            component={CommentBox}
                            name={`contents[${index}].comment`}
                        />
                    </RowBox>
                </StyledContent>
            ))}
        </>
    );
}

export default React.memo(ContentsBox);
