import { Query } from './Query';
import { Authentication } from './Mutation/Authentication';

export const resolvers = {
    Query,
    Mutation: {
        ...Authentication
    }
};