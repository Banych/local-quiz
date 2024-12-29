import { SmallUserCard } from "@/components/users/small-user-card/SmallUserCard";
import { User } from "@/models/User";
import React from "react";

interface UsersProps {
  users: { [key: string]: User };
}

const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div className="flex gap-4">
      {Object.values(users).map((user, index) => (
        <SmallUserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default Users;
