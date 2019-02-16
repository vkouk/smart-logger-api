import getUser from "../utils/getUser";

export const Query = {
  me(obj, args, ctx, info) {
    const userId = getUser(ctx);

    return ctx.db.query.user(
      {
        where: { id: userId }
      },
      info
    );
  },
  users(obj, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
  logs(obj, args, ctx, info) {
    const userId = getUser(ctx);

    return ctx.db.query.logs(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  },
  log(obj, args, ctx, info) {
    const userId = getUser(ctx);

    return ctx.db.query.log(
      {
        where: {
          id: args.id,
          user: {
            id: userId
          }
        }
      },
      info
    );
  }
};
