import yenv from "yenv";

const env = yenv("./config/config.yaml");

process.env.DATABASE_URL = env.DATABASE_URL;

export default env;
