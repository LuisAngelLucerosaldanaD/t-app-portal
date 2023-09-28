import {User} from "@app/core/models/user";

export interface Work {
  process: string;
  user: User;
  client_id: number;
  request_id: string;
  status: string;
  expired_at: string;
  create_at: string;
}
