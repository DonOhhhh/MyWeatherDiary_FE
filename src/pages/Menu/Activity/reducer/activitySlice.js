const initialState = {
    year: 2023,
    contents: new Array(12).fill().map((_, month) => ({
        [`${month + 1}`]: new Array(
            parseInt(new Date(2023, month + 1, 0).getDate())
        )
            .fill()
            .map((_, day) => ({
                month,
                contents: 0,
            })),
    })),
};
