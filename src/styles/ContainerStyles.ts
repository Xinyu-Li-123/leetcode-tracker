import React from "@deskulpt-test/react";

const containerStyles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#0f0f0f77",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "10px 7px 5px 7px",
    borderRadius: "5px",
  },
  row: {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "left",
    marginBottom: "10px",
    // flexWrap: "wrap",
    flexDirection: "row",
    gap: "20px",
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
