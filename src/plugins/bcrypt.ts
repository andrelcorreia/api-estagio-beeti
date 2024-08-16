import { FastifyInstance, FastifyPluginOptions } from "fastify";
import bcrypt from "fastify-bcrypt";
import fastifyPlugin from "fastify-plugin";

const bcryptPlugin = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any
) => {
  fastify.register(bcrypt, {
    saltWorkFactor: 12,
  });

  done();
};

export default fastifyPlugin(bcryptPlugin);
