import env from "@config/config";
import fastify, { FastifyInstance } from "fastify";
import ajvErrors from "ajv-errors";

class App {
  public app: FastifyInstance;
  public appDomain: string = env.API_DOMAIN || "localhost";
  public appPort: number = env.PORT || 3333;

  constructor(appInit: { plugins: any; routes: any }) {
    this.app = fastify({
      ajv: {
        customOptions: { allErrors: true },
        plugins: [ajvErrors],
      },
      schemaErrorFormatter: (errors, dataVar) => {
        const myErrorMessage = errors
          .map((error) => error.message && error.message.trim())
          .join(", ");

        return new Error(myErrorMessage);
      },
      bodyLimit: 20 * 1048576,
      maxParamLength: 1000,
      logger: true,
      trustProxy: true,
    });

    this.register(appInit.plugins);
    this.routes(appInit.routes);
  }

  private register(plugins: any) {
    plugins.forEach((plugin: any) => {
      this.app.register(plugin);
    });
  }

  public routes(routes: any) {
    routes.forEach((Route: any) => {
      const router = new Route();

      this.app.register(router.routes, {
        prefix: `${router.version}${router.prefixRoute}`,
      });
    });

    this.app.get(`${env.API_VERSION}/healthcheck`, async (request, reply) => {
      reply.send({ healthcheck: "server is alive" });
    });
  }

  public async listen() {
    try {
      this.app.ready((err) => {
        if (err) {
          this.app.log.error(err);
          process.exit(1);
        }
      });
      await this.app.listen({ port: this.appPort, host: "0.0.0.0" });

      this.app.log.info(
        `App listening on the http://${this.appDomain}:${this.appPort} 🌟👻 `
      );
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}

export { App };
