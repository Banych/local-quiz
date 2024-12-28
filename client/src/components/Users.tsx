import React from 'react';

interface User {
  username: string;
  state: Record<string, unknown>;
}

interface UsersProps {
  users: { [key: string]: User };
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div>
      {Object.values(users).map((user, index) => (
        <div key={index}>
          <p>{user.username}</p>
          <p>{JSON.stringify(user.state)}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
