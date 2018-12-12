import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Authentication = {
  async signup(parent, args, ctx, info) {
    //Hash Password
    const password = await bcrypt.hash(args.password, 10);
    // Create User
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password
      }
    });

    return {
      user,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      })
    };
  },
  async signin(parent, { email, password }, ctx, info) {
    //Check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    //CCheck if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      })
    };
  }
};
