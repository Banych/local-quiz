import { UserState } from "@/models/UserState";

export type User = {
  username: string;
  state: UserState;
  id: string;
};
