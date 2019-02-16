import getUser from "../../utils/getUser";

export const Log = {
  createLog(parent, { log, logTime }, ctx, info) {
    const userId = getUser(ctx);

    if (!userId) {
      throw Error("Please signin first");
    }

    const data = {
      log,
      logTime,
      user: {
        connect: { id: userId }
      }
    };

    return ctx.db.mutation.createLog({ data }, info);
  },
  async deleteLog(parent, { id }, ctx, info) {
    const userId = getUser(ctx);
    const log = await ctx.db.query.log(
      { where: { id } },
      `{ id log logTime user { id }}`
    );
    const ownsLog = log.user.id === userId;

    if (!userId && !ownsLog) {
      throw Error("You can't delete this log");
    }

    return ctx.db.mutation.deleteLog(
      {
        where: {
          id
        }
      },
      info
    );
  }
};
