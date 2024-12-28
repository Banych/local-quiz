import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketContext } from "../context/WebSocketContext";
import { useEffect, useMemo, useState } from "react";
import { User } from "../models/User";

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  const ws = useWebSocket("ws://192.168.1.134:8000/", {
    share: true,
    queryParams: currentUser ? { username: currentUser.username } : {},
  });

  const [users, setUsers] = useState<Record<string, User>>({});

  const isConnecting = useMemo(
    () => ws.readyState === ReadyState.CONNECTING,
    [ws.readyState]
  );

  const isConnected = useMemo(
    () => ws.readyState === ReadyState.OPEN,
    [ws.readyState]
  );

  useEffect(() => {
    if (ws.lastMessage !== null) {
      const data = JSON.parse(ws.lastMessage.data);
      if (data.UPDATE_USERS) {
        setUsers(data.UPDATE_USERS);
      }
      if (data.CURRENT_USER) {
        setCurrentUser(data.CURRENT_USER);

        localStorage.setItem("currentUser", JSON.stringify(data.CURRENT_USER));
      }
      if (data.NEW_USER) {
        setUsers((prev) => ({ ...prev, [data.NEW_USER.uuid]: data.NEW_USER }));
      }
      if (data.USER_DISCONNECTED) {
        setUsers((prev) => {
          const newUsers = { ...prev };
          delete newUsers[data.USER_DISCONNECTED];
          return newUsers;
        });
      }
    }
  }, [ws.lastMessage]);

  return (
    <WebSocketContext.Provider
      value={{
        users,
        currentUser,
        isConnecting,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
