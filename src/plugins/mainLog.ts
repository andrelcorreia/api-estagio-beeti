import { AppError } from "@src/helper/errosHandler";
import { ApiMainLogModel } from "@src/models/MainLogModel";
import { DoneFuncWithErrOrRes, FastifyInstance } from "fastify";
import { v4 as uuidV4 } from "uuid";

const apiMainLogModel = new ApiMainLogModel();

export async function mainLog(
  fastify: FastifyInstance,
  done: DoneFuncWithErrOrRes
) {
  fastify.addHook("onSend", async (request, reply, payload) => {
    try {
      const user = request.usrId;
      const { method } = request;
      const { body } = request;
      const { query } = request;
      const path = request.url;

      if (!user) {
        throw new AppError({
          statusCode: 404,
          message: "Usuário não autenticado!",
          result: "error",
        });
      }

      if (!Buffer.isBuffer(payload)) {
        const { statusCode, message, data } = payload
          ? JSON.parse(payload as string)
          : { statusCode: 500, message: "Payload Error", data: null };

        const mainLog = {
          id: uuidV4(),
          user_id: user,
          body:
            method === "GET"
              ? JSON.stringify(query)
              : JSON.stringify(path === "/v1/sessions" ? {} : body),
          method: method,
          route: path,
          status: statusCode,
          return_message: message,
          return_data: method === "GET" ? null : JSON.stringify(data),
        };

        await apiMainLogModel.create(mainLog);
      }

      done();
    } catch (error) {
      console.log({ message: "Error Main Log", error: error });
      done();
    }
  });
}
