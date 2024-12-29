import { ClassValue } from "clsx";
import { FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

import { cn } from "@/utils/cl";
import { useWebSocketContext } from "@/hooks/useWebsockets";
import { useCallback, useRef, useState } from "react";
import { UsersPopup } from "@/components/top-bar/UsersPopup";
import styles from "./TopBar.module.css";

export type TopBarProps = {
  className?: ClassValue;
};

export const TopBar = (props: TopBarProps) => {
  const { className } = props;

  const [isUsersPopupOpen, setIsUsersPopupOpen] = useState(false);
  const usersPopupRef = useRef<HTMLDivElement>(null);

  const { users } = useWebSocketContext();

  const handleUserButtonClick = useCallback(() => {
    setIsUsersPopupOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={cn(
        "flex justify-between items-center p-4 relative",
        className
      )}
    >
      <button className="p-2 text-3xl text-white">
        <FaUser />
      </button>

      <button
        className="p-2 text-3xl text-white"
        onClick={handleUserButtonClick}
      >
        <FaUserFriends />
      </button>

      <CSSTransition
        in={isUsersPopupOpen}
        timeout={300}
        nodeRef={usersPopupRef}
        classNames={{
          enter: styles["popup-enter"],
          enterActive: styles["popup-enter-active"],
          enterDone: styles["popup-enter-done"],
          exit: styles["popup-exit"],
          exitActive: styles["popup-exit-active"],
          exitDone: styles["popup-exit-done"],
        }}
        unmountOnExit
        mountOnEnter
      >
        <UsersPopup
          users={users}
          className="absolute right-2 top-full mt-2"
          ref={usersPopupRef}
        />
      </CSSTransition>
    </div>
  );
};
