import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";

if (env === "dev" || env === "test" || env === "prod") {
  dotenv.config({
    path: `src/config/${env}.env`
  });
}
