import getUser from "../../utils/getUser";

export const Log = {
  async createLog(parent, { log }, ctx, info) {
    const userId = getUser(ctx);

    if (!userId) {
      throw Error("Please signin first");
    }

    const data = {
      log,
      user: {
        connect: { id: userId }
      }
    };

    return ctx.db.mutation.createLog({ data }, info);
  }
};
