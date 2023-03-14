import styled from "@emotion/styled";

const Line = styled.hr`
    display: inline-block;
    margin: ${({ vMargin, hMargin }) => `${vMargin}px ${hMargin}px`};
    border: ${({ thick, lineStyle, lineColor }) =>
        `${thick}px ${lineStyle} ${lineColor}`};
`;

const Divider = ({
    type = "horizontal",
    hMargin = 0,
    vMargin = 0,
    lineThickness = 1,
    lineColor,
    lineStyle = "solid",
    ...props
}) => {
    return (
        <Line
            {...props}
            type={type}
            vMargin={vMargin}
            hMargin={hMargin}
            thick={lineThickness}
            lineColor={lineColor}
            lineStyle={lineStyle}
            style={{ ...props.style }}
        />
    );
};

export default Divider;
