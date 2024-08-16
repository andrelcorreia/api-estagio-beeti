import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyPlugin from "fastify-plugin";
import { verify } from "jsonwebtoken";
import env from "@config/config";
import jwt from "@fastify/jwt";
import { AppError } from "@helper/errosHandler";
import { UsersModel } from "@src/models/UsersModel";

interface PayLoad {
  iss: string;
  sub: string;
}

const authPlugin = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any
) => {
  fastify.register(jwt, {
    secret: env.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userModel = new UsersModel();
        const { token } = request.query as { token: string };
        const { sub } = token
          ? (verify(token, env.JWT_SECRET) as PayLoad)
          : ((await request.jwtVerify()) as PayLoad);

        if (!sub) {
          throw new AppError({
            code: 1,
            statusCode: 401,
            result: "error",
            message: "Token não encontrado!",
          });
        }

        const user = await userModel.findById(sub);

        if (!user) {
          console.log({ user });
          throw new AppError({
            code: 1,
            statusCode: 401,
            result: "error",
            message: "Não autorizado, token inválido",
          });
        }

        request.usrId = sub;
      } catch (err) {
        throw new AppError({
          code: 1,
          statusCode: 401,
          result: "error",
          message: "Não autorizado, token inválido",
        });
      }
    }
  );

  done();
};

export default fastifyPlugin(authPlugin);
