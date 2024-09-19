/**
 * @fileoverview: Fetch Leetcode user profile data
 */

// Helper function to fetch user profile
export default async function fetchUserProfile(api: string, username: string): Promise<any> {
	/** @brief Json payload to query user's public profile */
	const profilePayload = {
	  "query": `
		query userPublicProfile($username: String!) {
		  matchedUser(username: $username) {
			contestBadge {
			  name
			  expired
			  hoverText
			  icon
			}
			username
			githubUrl
			twitterUrl
			linkedinUrl
			profile {
			  ranking
			  userAvatar
			  realName
			  aboutMe
			  school
			  websites
			  countryName
			  company
			  jobTitle
			  skillTags
			  postViewCount
			  postViewCountDiff
			  reputation
			  reputationDiff
			  solutionCount
			  solutionCountDiff
			  categoryDiscussCount
			  categoryDiscussCountDiff
			}
		  }
		}
	  `,
	  "variables": {
		"username": username,
	  },
	  "operationName": "userPublicProfile"
	};
  
	try {
	  const response = await fetch(api, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(profilePayload),
	  });
  
	  if (!response.ok) {
		throw new Error(`Error fetching profile: ${response.statusText}`);
	  }
  
	  const data = await response.json();
	  return data.data.matchedUser;
	} catch (error) {
	  throw new Error(`Error fetching profile: ${error.message}`);
	}
  }
  