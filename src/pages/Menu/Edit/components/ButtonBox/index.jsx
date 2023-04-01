import { v4 } from "uuid";

export default function ButtonBox({ onAddClick }) {
    const defaultContent = (id) => ({
        id,
        imgSrc: "",
        comment: "",
    });

    return (
        <div role="group" aria-labelledby="Button-box">
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    onAddClick(defaultContent(v4()));
                }}
            >
                Add
            </button>
            <button type="submit">Submit</button>
        </div>
    );
}
