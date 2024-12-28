import { ClassValue } from "clsx";
import { useWebSocketContext } from "../../hooks/useWebsockets";
import Users from "../Users";
import { cn } from "../../utils/cl";

export type MainContainerProps = {
  classNames?: ClassValue;
};

export const MainContainer: React.FC<MainContainerProps> = (props) => {
  const { classNames } = props;

  const { users } = useWebSocketContext();

  return (
    <div className={cn(classNames, "flex flex-col p-4")}>
      <div className="flex flex-col bg-slate-100 rounded-md p-4">
        <Users users={users} />
      </div>
    </div>
  );
};
