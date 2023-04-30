import React from "react";

function RenderPropsComponent({ renderProp, ...props }) {
    const render = React.useCallback(() => {
        return renderProp(props);
    }, [renderProp, props]);

    return React.useMemo(() => {
        return render();
    }, [render]);
}
