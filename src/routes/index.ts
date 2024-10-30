import UserRoutes from "@routes/UsersRoute";
import SessionsRoutes from "./SessionsRoute";
import ProductsRoute from "./ProductsRoute";
import ClientsRoute from "./ClientsRoute";
import RequestForgotRoute from "./RequestForgotRoute";
import ServicesProvidedRoutes from "./ServicesProvidedRoute";
import MaintenanceRoutes from "./MaintenanceRoute";

const routes: any[] = [
  UserRoutes,
  SessionsRoutes,
  ProductsRoute,
  ClientsRoute,
  RequestForgotRoute,
  ServicesProvidedRoutes,
  MaintenanceRoutes,
];

export default routes;
