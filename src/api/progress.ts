/**
 * @fileoverview: Display my Leetcode progress
 */

// Helper function to fetch user progress
export default
async function fetchUserProgress(api: string, username: string): Promise<any> {
	/** @brief Json payload to query user's progress (e.g. num of easy questions solved) */
	let progressPayload = {
		"query": "\n    query userProfileUserQuestionProgressV2($userSlug: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n      difficulty\n    }\n    numFailedQuestions {\n      count\n      difficulty\n    }\n    numUntouchedQuestions {\n      count\n      difficulty\n    }\n    userSessionBeatsPercentage {\n      difficulty\n      percentage\n    }\n  }\n}\n    ",
		"variables": {
		"userSlug": username,
		},
		"operationName": "userProfileUserQuestionProgressV2"
	};

try {
	const response = await fetch(api, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(progressPayload),
	});

	if (!response.ok) {
	throw new Error(`Error fetching progress: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data.userProfileUserQuestionProgressV2;
} catch (error) {
	throw new Error(`Error fetching progress: ${error.message}`);
}
}