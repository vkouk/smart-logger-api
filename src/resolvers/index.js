import { Query } from "./Query";
import { Authentication } from "./Mutation/Authentication";
import { Log } from "./Mutation/Log";

export const resolvers = {
  Query,
  Mutation: {
    ...Authentication,
    ...Log
  }
};
