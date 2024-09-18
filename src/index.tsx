/**
 * @fileoverview Display my Leetcode progress and recent AC
 * 
 * Leetcode APIs obtained by inspecting the requests sent when viewing user's dashboard at https://leetcode.com/u/<username>/
 */

import React from "@deskulpt-test/react";

let username = "Xinyu-Li-123";
// let api = "https://leetcode.com/graphql/";
let api =  "http://localhost:3000/api/leetcode";
let errorMsg = "";

/** @breif Json payload to query user's progress (e.g. num of easy questions solved) */
let progressPayload = {
	"query": "\n    query userProfileUserQuestionProgressV2($userSlug: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n      difficulty\n    }\n    numFailedQuestions {\n      count\n      difficulty\n    }\n    numUntouchedQuestions {\n      count\n      difficulty\n    }\n    userSessionBeatsPercentage {\n      difficulty\n      percentage\n    }\n  }\n}\n    ",
	"variables": {
	  "userSlug": username,
	},
	"operationName": "userProfileUserQuestionProgressV2"
};
/** @brief Json payload to query user's recent AC submissions */
let recentAcSubPayload = {
	"query": "\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n    ",
	"variables": {
	  "username": username,
	  "limit": 5
	},
	"operationName": "recentAcSubmissions"
};

function Display() {
  const [progress, setProgress] = React.useState<any>(null);
  const [recentSubmissions, setRecentSubmissions] = React.useState<any[]>([]);

  React.useEffect(() => {
	errorMsg += "username: " + username + "\n";
    // Fetch user progress
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        setProgress(data.data.userProfileUserQuestionProgressV2);
      })
    //   .catch((error) => console.error("Error fetching progress:", error));
	  .catch((error) => {
		console.error("Error fetching progress:", error);
		errorMsg = errorMsg + "Error fetching progress: " + error + "\n";
	  });

    // Fetch recent submissions
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recentAcSubPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecentSubmissions(data.data.recentAcSubmissionList);
      })
    //   .catch((error) => console.error("Error fetching recent submissions:", error));
	  .catch((error) => {
		console.error("Error fetching recent submissions:", error);
		errorMsg = errorMsg + "Error fetching recent submissions: " + error + "\n";
	  });
  }, []);

  if (!progress || recentSubmissions.length === 0) {
    return (
		<div>
			Failed to get data for user {username}. Error message:
			<br />
			{errorMsg}
		</div>
	);
  }

  const totalProblems = {
    EASY: progress.numAcceptedQuestions[0].count + progress.numFailedQuestions[0].count + progress.numUntouchedQuestions[0].count,
    MEDIUM: progress.numAcceptedQuestions[1].count + progress.numFailedQuestions[1].count + progress.numUntouchedQuestions[1].count,
    HARD: progress.numAcceptedQuestions[2].count + progress.numFailedQuestions[2].count + progress.numUntouchedQuestions[2].count,
  };

  const totalSolved = {
    EASY: progress.numAcceptedQuestions[0].count,
    MEDIUM: progress.numAcceptedQuestions[1].count,
    HARD: progress.numAcceptedQuestions[2].count,
  };

  const totalOverallSolved = totalSolved.EASY + totalSolved.MEDIUM + totalSolved.HARD;
  const totalOverallProblems = totalProblems.EASY + totalProblems.MEDIUM + totalProblems.HARD;

  return (
    <div>
      <h2>Leetcode Progress for {username}</h2>

      {/* Display problem-solving progress */}
      <div>
        <h3>Problem Solving Progress</h3>
        <ul>
          <li style={{ color: "green" }}>
            Easy: {totalSolved.EASY} / {totalProblems.EASY}
          </li>
          <li style={{ color: "orange" }}>
            Medium: {totalSolved.MEDIUM} / {totalProblems.MEDIUM}
          </li>
          <li style={{ color: "red" }}>
            Hard: {totalSolved.HARD} / {totalProblems.HARD}
          </li>
          <li>
            <strong>Total: {totalOverallSolved} / {totalOverallProblems}</strong>
          </li>
        </ul>
      </div>

      {/* Display recent accepted submissions */}
      <div>
        <h3>Recent Accepted Submissions</h3>
        <ul>
          {recentSubmissions.map((submission) => (
            <li key={submission.id}>
              <a href={`https://leetcode.com/problems/${submission.titleSlug}`} target="_blank" rel="noopener noreferrer">
                {submission.title}
              </a> - {new Date(parseInt(submission.timestamp) * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default {
  render: () => <Display />,
  width: "300px",
  height: "auto",
};
