import styled from "@emotion/styled";

const BtnBackground = styled.div`
    right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 100%;

    background-color: white;
    &:hover {
        background-color: #717171;
        & hr {
            border-color: #d3eaff;
        }
        cursor: pointer;
    }
`;

const MiddleLine = styled.hr`
    border: 2px solid black;
    border-radius: 15px;
    width: 15px;
`;

export default function DeleteBtn({ onClick }) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                padding: "0px 10px 0 0",
            }}
        >
            <BtnBackground onClick={onClick}>
                <MiddleLine />
            </BtnBackground>
        </div>
    );
}
