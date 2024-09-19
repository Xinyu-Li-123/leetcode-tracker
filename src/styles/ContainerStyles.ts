import React from "@deskulpt-test/react";

const containerStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "transparent",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "10px 0 0 0",
    borderRadius: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "left",
    marginBottom: "10px",
    // flexWrap: "wrap",
    flexDirection: "column",
    gap: "5px",
  },
  loading: {
    textAlign: "center",
    color: "#888",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default containerStyles;
