import React from "@deskulpt-test/react";

const recentSubmissionsStyles: { [key: string]: React.CSSProperties } = {
  submissionsSection: {
    marginTop: "10px",
  },
  submissionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
    borderBottom: "1px solid #333",
  },
  submissionTitle: {
    flex: 2,
    fontSize: "14px",
    textAlign: "left",
  },
  submissionTime: {
    flex: 1,
    fontSize: "12px",
    color: "#888",
    textAlign: "right",
  },
};

export default recentSubmissionsStyles;
