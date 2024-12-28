import { createContext } from "react";
import { User } from "../models/User";

export type MainState = {
  users: { [key: string]: User };
  isConnecting: boolean;
  isConnected: boolean;
  currentUser?: User;
};

export const WebSocketContext = createContext<MainState>({
  users: {},
  isConnecting: false,
  isConnected: false,
});
