import React, { Fragment } from "react";

const Loading = () => {
  const loadingAnimation = {
    "@keyframes loadingAnimation": {
      "0%": {
        height: 0,
      },
      "50%": {
        height: "100%",
      },
      "100%": {
        height: 0,
      },
    },
  };

  return (
    <Fragment>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "30px",
            background: "black",
            marginRight: "5px",
            animation: "loadingAnimation 1s infinite",
            ...loadingAnimation["@keyframes loadingAnimation"],
          }}
        ></div>
        <div
          style={{
            width: "10px",
            height: "20px",
            background: "black",
            marginRight: "5px",
            animation: "loadingAnimation 1s infinite 0.25s",
            ...loadingAnimation["@keyframes loadingAnimation"],
          }}
        ></div>
        <div
          style={{
            width: "10px",
            height: "10px",
            background: "black",
            animation: "loadingAnimation 1s infinite 0.5s",
            ...loadingAnimation["@keyframes loadingAnimation"],
          }}
        ></div>
      </div>
    </div>
    </Fragment>
  );
};

export default Loading;
