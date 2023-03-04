import ContentReplaceButton from "../components/ContentReplaceButton";

export default {
    title: "Component/ContentReplaceButton",
    component: ContentReplaceButton,
    argTypes: {
        size: {
            defaultValue: 24,
            control: { type: "range", min: 24, max: 100 },
        },
        leftClick: { action: "left clicked" },
        rightClick: { action: "right clicked" },
    },
};

export const Default = (args) => {
    return <ContentReplaceButton {...args} />;
};
