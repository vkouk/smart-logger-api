import getUser from "../../utils/getUser";

export const Log = {
  async createLog(parent, { log, logTime }, ctx, info) {
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
  }
};
