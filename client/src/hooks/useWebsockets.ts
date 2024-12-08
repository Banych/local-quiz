import useWebSocket from "react-use-websocket"
import { faker } from "@faker-js/faker"

export const useWebsockets = () => {

    const ws = useWebSocket(
        "ws://localhost:8000/",
        {
            share: true,
        }
    )

    return ws
}