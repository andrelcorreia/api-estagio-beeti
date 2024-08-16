import fastifyCors from "@fastify/cors";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";

const corsPlugin = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any
) => {
  fastify.register(fastifyCors, {
    delegator: (req, callback) => {
      const corsOptions = {
        origin: true,
      };

      // if (!req.headers.origin && !req.headers.referer) {
      //   callback(new Error("Erro de origin do cors"), { origin: false })
      //   return
      // }

      // if (
      //   req.headers.referer === env.URL_FRONT_DASH ||
      //   req.headers.origin === env.URL_FRONT_DASH
      // )
      {
        callback(null, corsOptions);
        return;
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  done();
};

export default fastifyPlugin(corsPlugin);
