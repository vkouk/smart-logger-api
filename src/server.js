import "@babel/polyfill";
import { GraphQLServer } from "graphql-yoga";
import "./config";
import cookieParser from "cookie-parser";
import { resolvers } from "./resolvers";
import { prisma } from "./prisma";
import jwt from "jsonwebtoken";

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db: prisma })
});

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await prisma.query.user(
    { where: { id: req.userId } },
    "{ id, email, name }"
  );

  req.user = user;
  next();
});

server.start({
  port: process.env.PORT || 5000
});
