import { WebSocketServer, WebSocket, RawData } from "ws";
import * as http from "http";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { Question, Score, User } from "./models";
import { parse } from "url";
import * as dotenv from "dotenv";

dotenv.config();

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;
const connections: { [key: string]: WebSocket } = {};
const users: { [key: string]: User } = {};
const scoreboard: Score[] = [];
const questions: Question[] = [
  {
    id: "1",
    question: "What is 1 + 1?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    id: "2",
    question: "What is 2 + 2?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
  {
    id: "3",
    question: "What is 3 + 3?",
    answers: ["1", "2", "3", "6"],
    correctAnswer: "6",
  },
];

const handleAdminAuthorization = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { password } = JSON.parse(body);

    if (password === process.env.ADMIN_PASSWORD) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ authorized: true }));
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ authorized: false }));
    }
  });
};

const handleAddQuestion = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newQuestion: Question = JSON.parse(body);
    questions.push(newQuestion);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: true }));
  });
};

const handleClose = (uuid: string) => {
  console.log(`${users[uuid].username} disconnected`);
  delete connections[uuid];
  delete users[uuid];
  broadcastUserDisconnect(uuid);
};

const sendCurrentUserUpdate = (uuid: string) => {
  const connection = connections[uuid];
  const message = JSON.stringify({ CURRENT_USER: users[uuid] });
  connection.send(message);
};

const broadcastNewUser = (uuid: string) => {
  Object.keys(connections).forEach((key) => {
    if (key === uuid) return;
    const connection = connections[key];
    const message = JSON.stringify({ NEW_USER: users[uuid] });
    connection.send(message);
  });
};

const broadcastUserDisconnect = (uuid: string) => {
  Object.keys(connections).forEach((key) => {
    if (key === uuid) return;
    const connection = connections[key];
    const message = JSON.stringify({ USER_DISCONNECTED: uuid });
    connection.send(message);
  });
};

const sendInitialData = (uuid: string) => {
  const connection = connections[uuid];
  const message = JSON.stringify({
    UPDATE_USERS: users,
    UPDATE_QUESTIONS: questions,
    UPDATE_SCOREBOARD: scoreboard,
  });
  connection.send(message);
};

wsServer.on("connection", (connection: WebSocket, req) => {
  const uuid = uuidv4();
  connections[uuid] = connection;

  const query = parse(req.url!, true).query;
  const username = query.username as string;

  users[uuid] = {
    id: uuid,
    username: username || faker.animal.type(),
    state: {},
  };

  connection.on("close", () => handleClose(uuid));

  sendCurrentUserUpdate(uuid);
  sendInitialData(uuid);
  broadcastNewUser(uuid);

  console.log(`${users[uuid].username} connected`);
});

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url?.startsWith("/admin/authorize")) {
    handleAdminAuthorization(req, res);
  } else if (
    req.method === "POST" &&
    req.url?.startsWith("/admin/add-question")
  ) {
    handleAddQuestion(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
