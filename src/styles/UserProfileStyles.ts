import React from "@deskulpt-test/react";

const profileStyles: { [key: string]: React.CSSProperties } = {
  profileSection: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  username: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default profileStyles;
