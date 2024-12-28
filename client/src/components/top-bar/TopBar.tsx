import { ClassValue } from "clsx";
import { cn } from "../../utils/cl";
import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

export type TopBarProps = {
  classNames?: ClassValue;
};

export const TopBar = (props: TopBarProps) => {
  const { classNames } = props;

  return (
    <div className={cn(classNames, "flex justify-between items-center p-4")}>
      <button className="p-2 text-3xl text-white">
        <FaUser />
      </button>

      <button className="p-2 text-3xl text-white">
        <FaUserFriends />
      </button>
    </div>
  );
};
