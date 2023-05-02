import styled from "@emotion/styled";
import { Divider, Skeleton } from "@mui/material";
import React from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
    margin: 10px 0;

    width: 100%;
    max-width: 400px;
    height: auto;

    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 15px;
`;

function DiarySkeleton() {
    return (
        <Container>
            <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={40}
                sx={{ borderRadius: "15px" }}
            />
            <Divider sx={{ width: "95%", border: "1px dashed #e0e0e0" }} />
            <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={400}
                sx={{ borderRadius: "15px" }}
            />
            <Divider sx={{ width: "95%", border: "1px dashed #e0e0e0" }} />
            <Skeleton
                animation="wave"
                variant="rounded"
                width="100%"
                height={100}
                sx={{ borderRadius: "15px" }}
            />
        </Container>
    );
}

export default React.memo(DiarySkeleton);
