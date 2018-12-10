export const Query = {
  me(obj, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(obj, args, ctx, info) {
    // if (!ctx.request.userId) {
    //   throw new Error("You must be logged in!");
    // }

    return ctx.db.query.users({}, info);
  }
};
