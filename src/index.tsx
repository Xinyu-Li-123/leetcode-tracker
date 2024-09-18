/**
 * @fileoverview Display my Leetcode progress and recent AC
 * 
 * Leetcode apis obtained by inspecting the requests send when viewing user's dashboard at https://leetcode.com/u/<username>/
 */

import React from "@deskulpt-test/react";

let username = "Xinyu-Li-123";
let api = "https://leetcode.com/graphql/"
/** @breif Json payload to query user's progress (e.g. num of easy question solved) */
let progressPayload = {
	"query": "\n    query userProfileUserQuestionProgressV2($userSlug: String!) {\n  userProfileUserQuestionProgressV2(userSlug: $userSlug) {\n    numAcceptedQuestions {\n      count\n      difficulty\n    }\n    numFailedQuestions {\n      count\n      difficulty\n    }\n    numUntouchedQuestions {\n      count\n      difficulty\n    }\n    userSessionBeatsPercentage {\n      difficulty\n      percentage\n    }\n  }\n}\n    ",
	"variables": {
	  "userSlug": username,
	},
	"operationName": "userProfileUserQuestionProgressV2"
  }
/** @brief Json payload to query user's recent AC submissions */
let recentAcSubPayload = {
	"query": "\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n    ",
	"variables": {
	  "username": username,
	  "limit": 15
	},
	"operationName": "recentAcSubmissions"
};

/**
 * @brief Display user's essential Leetcode info
 * 
 * 
 */
function Display() {
	return (
		<div>
			<h2>Counter</h2>
		</div>
	);
}

export default {
	render: () => <Display />,
	width: "200px",
	height: "auto",
}