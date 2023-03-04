import styled from "@emotion/styled";

const IconWrapper = styled.div`
    background-image: url(${({ src }) => src});
    /* background-size: cover; */
    display: inline-block;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    border-radius: 15px;
    &:hover {
        background-color: ${({ hoverColor }) =>
            hoverColor ? hoverColor : "none"};
        cursor: pointer;
    }
`;

export default function Icon({
    name,
    svgUrl,
    size,
    hoverColor,
    onClick,
    ...props
}) {
    return (
        <IconWrapper
            {...props}
            src={svgUrl}
            width={size}
            height={size}
            hoverColor={hoverColor}
            onClick={onClick}
        />
    );
}
