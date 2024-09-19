/**
 * @fileoverview Display my Leetcode progress and recent AC
 * 
 * Leetcode APIs obtained by inspecting the requests sent when viewing user's dashboard at https://leetcode.com/u/<username>/
 */

import React from "@deskulpt-test/react";
import fetchUserProgress from "./api/progress";
import fetchRecentSubmissions from "./api/recent-ac";


let username = "Xinyu-Li-123";
// let api = "https://leetcode.com/graphql/";
let api =  "http://localhost:3000/api/leetcode";

function Display() {
	const [progress, setProgress] = React.useState<any>(null);
	const [recentSubmissions, setRecentSubmissions] = React.useState<any[]>([]);
	const [error, setError] = React.useState<string>("");

	React.useEffect(() => {
		const fetchData = async () => {
		try {
			// Fetch user progress
			const userProgress = await fetchUserProgress(api, username);
			setProgress(userProgress);

			// Fetch recent submissions
			const submissions = await fetchRecentSubmissions(api, username);
			setRecentSubmissions(submissions);
		} catch (err: any) {
			console.error(err);
			setError(err.message);
		}
		};

		fetchData();
	}, []);

	// Display error message if an error occurred
	if (error) {
		return (
		<div>
			Failed to get data for user {username}. Error message:
			<br />
			{error}
		</div>
		);
	}

	// Display loading message until data is fetched
	if (!progress || recentSubmissions.length === 0) {
		return <div>Loading...</div>;
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
