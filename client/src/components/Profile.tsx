// src/components/Profile.tsx
import React from 'react';
import { Typography } from '@mui/material';

interface UserProfile {
  firstName: string;
  lastName: string;
}

const Profile: React.FC<UserProfile> = ({ firstName, lastName }) => {
  return (
    <div>
      <Typography variant="h6">Профиль пользователя</Typography>
      <Typography variant="body1">
        Имя: {firstName}
      </Typography>
      <Typography variant="body1">
        Фамилия: {lastName}
      </Typography>
    </div>
  );
};

export default Profile;
