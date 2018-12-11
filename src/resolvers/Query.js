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
  async users(obj, args, ctx, info) {
    return ctx.db.query.users({}, info);
  }
};
