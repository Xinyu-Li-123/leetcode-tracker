import React from "@deskulpt-test/react";
import profileStyles from "../styles/UserProfileStyles";

interface UserProfileProps {
  username: string;
  avatarUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, avatarUrl }) => {
  return (
    <div style={profileStyles.profileSection}>
      <img src={avatarUrl} alt="Profile" style={profileStyles.profileImage} />
      <span style={profileStyles.username}>{username}</span>
    </div>
  );
};

export default UserProfile;
