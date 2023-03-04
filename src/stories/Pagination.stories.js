import Pagination from "../components/Pagination";

export default {
    title: "Component/Pagination",
    component: Pagination,
    argTypes: {
        dotSize: {
            defaultValue: 2,
            control: { type: "range", min: 2, max: 100 },
        },
        length: {
            defaultValue: 3,
            control: { type: "range", min: 1, max: 10 },
        },
        curIndex: {
            defaultValue: 1,
            control: { type: "range", min: 1, max: 10 },
        },
    },
};

export const Default = (args) => {
    return <Pagination {...args} />;
};
