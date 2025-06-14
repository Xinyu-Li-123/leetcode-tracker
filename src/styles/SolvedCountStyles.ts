import React from "@deskulpt-test/react";

const solvedCountStyles: { [key: string]: React.CSSProperties } = {
  problemStats: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    justifyContent: "space-around",
  },
  problemStat: {
    textAlign: "center",
    fontSize: "12px",
  },
  problemSolved: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default solvedCountStyles;
