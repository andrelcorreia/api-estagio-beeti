import { RequestForgotPasswordConfirmController } from "./RequestForgotPasswordConfirmController";
import { RequestForgotPasswordController } from "./RequestForgotPasswordController";

const requestForgotPasswordController = new RequestForgotPasswordController();
const requestForgotPasswordConfirmController =
  new RequestForgotPasswordConfirmController();

export {
  requestForgotPasswordController,
  requestForgotPasswordConfirmController,
};
