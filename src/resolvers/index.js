import { Query } from "./Query";
import { Authentication } from "./Mutation/Authentication";
import { Logs } from "./Mutation/Logs";

export const resolvers = {
  Query,
  Mutation: {
    ...Authentication,
    ...Logs
  }
};
