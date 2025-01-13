import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      id="collection-bar"
      style={{
        position: "absolute",
        top: "10px",
        right: "20px",
        backgroundColor: "#252637",
        padding: "5px 10px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: "bold",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginRight: "8px" }}>Collection {progress.toFixed(2)}%</span>
            <div
                style={{
                width: "110px",
                height: "4px",
                backgroundColor: "#3d566e",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
                }}
            >
        </div>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#2ecc71",
            transition: "width 0.5s ease-out",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
