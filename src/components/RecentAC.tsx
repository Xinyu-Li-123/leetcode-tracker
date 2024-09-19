import React from "@deskulpt-test/react";
import recentSubmissionsStyles from "../styles/RecentACStyles";

interface Submission {
  id: string;
  title: string;
  timestamp: string;
}

interface RecentSubmissionsProps {
  submissions: Submission[];
}

function getSubmissionTimeGap(submissionTime: string): string {
  const currentTime = new Date().getTime();
  const submissionTimeInMs = parseInt(submissionTime) * 1000;
  const timeGap = currentTime - submissionTimeInMs;

  if (timeGap < 60000) {
    return "just now";
  } else if (timeGap < 3600000) {
    return `${Math.floor(timeGap / 60000)} minutes ago`;
  } else if (timeGap < 86400000) {
    return `${Math.floor(timeGap / 3600000)} hours ago`;
  } else {
    return `${Math.floor(timeGap / 86400000)} days ago`;
  }
}

const RecentSubmissions: React.FC<RecentSubmissionsProps> = ({ submissions }) => {
  return (
    <div style={recentSubmissionsStyles.submissionsSection}>
      {submissions.map((submission) => (
        <div style={recentSubmissionsStyles.submissionItem} key={submission.id}>
          <span style={recentSubmissionsStyles.submissionTitle}>{submission.title}</span>
          <span style={recentSubmissionsStyles.submissionTime}>
            {getSubmissionTimeGap(submission.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentSubmissions;
