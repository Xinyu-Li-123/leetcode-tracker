import React from "@deskulpt-test/react";
import fetchUserProgress from "./api/progress";
import fetchRecentSubmissions from "./api/recent-ac";
import fetchUserProfile from "./api/profile";
import UserProfile from "./components/UserProfile";
import SolvedCount from "./components/SolvedCount";
import RecentAC from "./components/RecentAC";
import Footer from "./components/Footer";
import containerStyles from "./styles/ContainerStyles";
import { username, api } from "./config";

function Display() {
  const [progress, setProgress] = React.useState<any>(null);
  const [recentSubmissions, setRecentSubmissions] = React.useState<any[]>([]);
  const [profile, setProfile] = React.useState<any>(null);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userProfile = await fetchUserProfile(api, username);
        setProfile(userProfile);

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
      <div style={containerStyles.error}>
        Failed to get data for user {username}. Error message:
        <br />
        {error}
      </div>
    );
  }

  // Display loading message until data is fetched
  if (!profile || !progress || recentSubmissions.length === 0) {
    return <div style={containerStyles.loading}>Loading...</div>;
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

  return (
    <div style={containerStyles.container}>
      <div style={containerStyles.row}>
        <UserProfile username={profile.username} avatarUrl={profile.profile.userAvatar} />
        <SolvedCount
          easySolved={totalSolved.EASY}
          easyTotal={totalProblems.EASY}
          mediumSolved={totalSolved.MEDIUM}
          mediumTotal={totalProblems.MEDIUM}
          hardSolved={totalSolved.HARD}
          hardTotal={totalProblems.HARD}
        />
      </div>

      <RecentAC submissions={recentSubmissions} />

      <Footer />
    </div>
  );
}

export default {
  render: () => <Display />,
  width: "210px",
  height: "auto",
};
