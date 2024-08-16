import AuthPlugin from "@src/plugins/auth";
import bcryptPlugin from "@plugins/bcrypt";
import CorsPlugin from "@plugins/cors";
import { App } from "@shared/app";
import routes from "./routes";

const app = new App({
  routes,
  plugins: [bcryptPlugin, AuthPlugin, CorsPlugin],
});

app.listen();
