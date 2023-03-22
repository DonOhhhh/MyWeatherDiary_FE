import styled from "@emotion/styled";

const InputBox = styled.input`
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border: 5px solid #a29b9b;
    border-radius: 20px;

    font-family: "Inter";
    font-weight: 400;
    font-size: 24px;

    &:focus {
        outline: none;
    }
`;

export default InputBox;
