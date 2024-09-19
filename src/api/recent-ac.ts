/**
 * @fileoverview: Display my Leetcode recent AC
 */

export default
async function fetchRecentSubmissions(api: string, username: string): Promise<any[]> {
	/** @brief Json payload to query user's recent AC submissions */
	let recentAcSubPayload = {
		"query": "\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n    ",
		"variables": {
		"username": username,
		"limit": 5
		},
		"operationName": "recentAcSubmissions"
	};

try {
	const response = await fetch(api, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(recentAcSubPayload),
	});

	if (!response.ok) {
	throw new Error(`Error fetching recent submissions: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data.recentAcSubmissionList;
} catch (error) {
	throw new Error(`Error fetching recent submissions: ${error.message}`);
}
}
