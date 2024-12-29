import { User } from "@/models/User";
import { cn } from "@/utils/cl";
import { ClassValue } from "clsx";
import Avatar from "react-avatar";
import styles from "./SmallUserCard.module.css";

export type SmallUserCardProps = {
  user: User;
  classNames?: ClassValue;
};

export const SmallUserCard: React.FC<SmallUserCardProps> = (props) => {
  const { user, classNames } = props;

  return (
    <div
      className={cn(
        styles.card,
        "border border-gray-300 p-2 rounded-lg flex items-center",
        "hover:bg-gray-200 transition-colors duration-300",
        classNames
      )}
    >
      <Avatar name={user.username} round size="40" textSizeRatio={2} />
      <div className="ml-4 flex flex-col items-start">
        <p className="m-0 font-bold text-xl">{user.username}</p>
        {user.state.statusMessage && (
          <p className="m-0 text-gray-500">{user.state.statusMessage}</p>
        )}
        {user.state.lastMessage && (
          <p className="m-0 text-gray-500">{user.state.lastMessage}</p>
        )}
      </div>
    </div>
  );
};
