import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { prisma } from './prisma';
import './config'; 

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db: prisma })
});

server.start({
    port: process.env.PORT || 5000
});