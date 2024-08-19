import UserRoutes from "@routes/UsersRoute";
import SessionsRoutes from "./SessionsRoute";
import ProductsRoute from "./ProductsRoute";
import ClientsRoute from "./ClientsRoute";
import RequestForgotRoute from "./RequestForgotRoute";

const routes: any[] = [
  UserRoutes,
  SessionsRoutes,
  ProductsRoute,
  ClientsRoute,
  RequestForgotRoute,
];

export default routes;
