import { useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";

export const useWebSocketContext = () => useContext(WebSocketContext);
