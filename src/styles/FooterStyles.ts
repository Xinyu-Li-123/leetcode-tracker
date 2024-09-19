import React from "@deskulpt-test/react";

const footerStyles: { [key: string]: React.CSSProperties } = {
  footer: {
    // flex and right align
    display: "flex",
    justifyContent: "flex-end",
    // center items
    gap: "5px",
    alignItems: "center",
    marginTop: "5px",
    fontSize: "11px",
    color: "grey"
  },
  leetcodeIcon: {
    width: "13px",
    height: "13px",
  },
};

export default footerStyles;
