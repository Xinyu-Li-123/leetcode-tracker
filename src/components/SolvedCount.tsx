import React from "@deskulpt-test/react";
import solvedCountStyles from "../styles/SolvedCountStyles";

interface SolvedCountProps {
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

const COLORS = {
  EASY: "#00B8A4",
  MEDIUM: "#FF375F",
  HARD: "#FFC01E",
};

const SolvedCount: React.FC<SolvedCountProps> = ({
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}) => {
  return (
    <div style={solvedCountStyles.problemStats}>
      <div style={solvedCountStyles.problemStat}>
        <span style={{ ...solvedCountStyles.problemSolved, color: COLORS.EASY }}>{easySolved}</span> / {easyTotal}
      </div>
      <div style={solvedCountStyles.problemStat}>
        <span style={{ ...solvedCountStyles.problemSolved, color: COLORS.MEDIUM }}>{mediumSolved}</span> / {mediumTotal}
      </div>
      <div style={solvedCountStyles.problemStat}>
        <span style={{ ...solvedCountStyles.problemSolved, color: COLORS.HARD }}>{hardSolved}</span> / {hardTotal}
      </div>
    </div>
  );
};

export default SolvedCount;
