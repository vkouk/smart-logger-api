import jwt from "jsonwebtoken";

export default ctx => {
  const header = ctx.request
    ? ctx.request.headers.authorization
    : ctx.connection.context.authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }
};
