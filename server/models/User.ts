import { UserState } from "./UserState";

export type User = {
  id: string;
  username: string;
  state: UserState;
};
