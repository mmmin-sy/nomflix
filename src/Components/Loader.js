import React from "react";
import styled from "styled-components";

const LoadingBar = styled.div`
    margin: 0 auto;
    margin-top: 50px;
    border: 8px solid #2d3436;
    border-top: 8px solid #e74c3c; /* Red */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default () => <LoadingBar />;
