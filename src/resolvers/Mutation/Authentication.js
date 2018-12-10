import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Authentication = {
  async signup(parent, args, ctx, info) {
    //Hash Password
    const password = await bcrypt.hash(args.password, 10);
    // Create User
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      info
    );
    //Create User token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    //Set cookie duration
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });

    return user;
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
    //Generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    //Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Adios!!" };
  }
};
